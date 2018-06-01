import faker from "faker"

import { version } from "../package.json"

// Seed is based on current version number. The intent is that any major
// version change will yield different resultsl
const majorVersion = parseInt(version.match(/\d+/g).shift(), 10) || 1

const fakerResolver = template => (parent, args) => {
  const { value = template } = args

  return faker.fake(value)
}

// The resolvers
export const MockAddress = {
  city: fakerResolver("{{address.city}}"),
  cityPrefix: fakerResolver("{{address.cityPrefix}}"),
  country: fakerResolver("{{address.country}}"),
  countryCode: fakerResolver("{{address.countryCode}}"),
  county: fakerResolver("{{address.county}}"),
  latitude: fakerResolver("{{address.latitude}}"),
  longitude: fakerResolver("{{address.longitude}}"),
  secondaryAddress: fakerResolver("{{address.secondaryAddress}}"),
  state: fakerResolver("{{address.state}}"),
  stateAbbr: fakerResolver("{{address.stateAbbr}}"),
  streetAddress: fakerResolver("{{address.streetAddress}}"),
  streetName: fakerResolver("{{address.streetName}}"),
  streetPrefix: fakerResolver("{{address.streetPrefix}}"),
  streetSuffix: fakerResolver("{{address.streetSuffix}}"),
  zipCode: fakerResolver("{{address.zipCode}}"),
}

export const MockCommerce = {
  color: fakerResolver("{{commerce.color}}"),
  department: fakerResolver("{{commerce.department}}"),
  price: fakerResolver("{{commerce.price}}"),
  product: fakerResolver("{{commerce.product}}"),
  productAdjective: fakerResolver("{{commerce.productAdjective}}"),
  productName: fakerResolver("{{commerce.productName}}"),
  productMaterial: fakerResolver("{{commerce.productMaterial}}"),
}

export const MockCompany = {
  bs: fakerResolver("{{company.bs}}"),
  bsAdjective: fakerResolver("{{company.bsAdjective}}"),
  bsBuzz: fakerResolver("{{company.bsBuzz}}"),
  bsNoun: fakerResolver("{{company.bsNoun}}"),
  catchPhraseAdjective: fakerResolver("{{company.catchPhraseAdjective}}"),
  catchPhraseDescriptor: fakerResolver("{{company.catchPhraseDescriptor}}"),
  catchPhrase: fakerResolver("{{company.catchPhrase}}"),
  catchPhraseNoun: fakerResolver("{{company.catchPhraseNoun}}"),
  companyName: fakerResolver("{{company.companyName}}"),
  companySuffix: fakerResolver("{{company.companySuffix}}"),
  suffixes(parent, args) {
    return faker.company.suffixes()
  },
}

export const MockDatabase = {
  collation: fakerResolver("{{database.collation}}"),
  column: fakerResolver("{{database.column}}"),
  engine: fakerResolver("{{database.engine}}"),
  type: fakerResolver("{{database.type}}"),
}

export const MockDate = {
  between(parent, args) {
    return faker.date.between(args.from, args.to)
  },
  future(parent, args) {
    return faker.date.future(args.years, args.refDate)
  },
  month: fakerResolver("{{date.month}}"),
  past(parent, args) {
    return faker.date.past(args.years, args.refDate)
  },
  recent(parent, args) {
    return faker.date.recent(args.days)
  },
  weekday: fakerResolver("{{date.weekday}}"),
}

export const MockFinance = {
  account: fakerResolver("{{finance.account}}"),
  accountName: fakerResolver("{{finance.accountName}}"),
  amount: fakerResolver("{{finance.amount}}"),
  bic: fakerResolver("{{finance.bic}}"),
  bitcoinAddress: fakerResolver("{{finance.bitcoinAddress}}"),
  currencyCode: fakerResolver("{{finance.currencyCode}}"),
  currencyName: fakerResolver("{{finance.currencyName}}"),
  currencySymbol: fakerResolver("{{finance.currencySymbol}}"),
  iban: fakerResolver("{{finance.iban}}"),
  mask: fakerResolver("{{finance.mask}}"),
  transactionType: fakerResolver("{{finance.transactionType}}"),
}

export const MockHacker = {
  abbreviation: fakerResolver("{{hacker.abbreviation}}"),
  adjective: fakerResolver("{{hacker.adjective}}"),
  ingverb: fakerResolver("{{hacker.ingverb}}"),
  noun: fakerResolver("{{hacker.noun}}"),
  phrase: fakerResolver("{{hacker.phrase}}"),
  verb: fakerResolver("{{hacker.verb}}"),
}

export const MockObject = {
  address: () => ({}),
  Boolean: fakerResolver("{{random.boolean}}"),
  commerce: () => ({}),
  company: () => ({}),
  database: () => ({}),
  date: () => ({}),
  finance: () => ({}),
  Float: fakerResolver("0.{{random.number}}"),
  hacker: () => ({}),
  ID: fakerResolver("{{random.number}}"),
  Int: fakerResolver("{{random.number}}"),
  List(parent, args) {
    const { length } = args

    return Array.from({ length }).map(() => ({}))
  },
  Mock(parent, args) {
    const { seed = majorVersion } = args

    faker.seed(seed)

    return {}
  },
  String: fakerResolver("{{lorem.sentence}}"),
}

export const Query = {
  Mock: MockObject.Mock,
}

export const resolvers = {
  MockAddress,
  MockCommerce,
  MockCompany,
  MockDatabase,
  MockDate,
  MockFinance,
  MockHacker,
  MockObject,
  Query,
}
