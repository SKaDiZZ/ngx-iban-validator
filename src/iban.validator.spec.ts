import { describe, it } from 'mocha';
import { expect } from 'chai';

import { validateIBAN } from './iban.validator';

describe('ngx-iban-validator', () => {
  it('validateIBAN for Albania AL35202111090000000001234567 should return false', () => {
    expect(validateIBAN({ value: 'AL35202111090000000001234567' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Andorra AD1400080001001234567890 should return false', () => {
    expect(validateIBAN({ value: 'AD1400080001001234567890' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Austria AT483200000012345864 should return false', () => {
    expect(validateIBAN({ value: 'AT483200000012345864' }).ibanInvalid).false;
  });
  it('validateIBAN for Azerbaijan AZ96AZEJ00000000001234567890 should return false', () => {
    expect(validateIBAN({ value: 'AZ96AZEJ00000000001234567890' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Bahrain BH02CITI00001077181611 should return false', () => {
    expect(validateIBAN({ value: 'BH02CITI00001077181611' }).ibanInvalid).false;
  });
  it('validateIBAN for Belarus BY86AKBB10100000002966000000 should return false', () => {
    expect(validateIBAN({ value: 'BY86AKBB10100000002966000000' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Belgium BE71096123456769 should return false', () => {
    expect(validateIBAN({ value: 'BE71096123456769' }).ibanInvalid).false;
  });
  it('validateIBAN for Bosnia and Herzegovina	BA393385804800211234 should return false', () => {
    expect(validateIBAN({ value: 'BA393385804800211234' }).ibanInvalid).false;
  });
  it('validateIBAN for Brazil	BR1500000000000010932840814P2 should return false', () => {
    expect(validateIBAN({ value: 'BR1500000000000010932840814P2' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Bulgaria	BG18RZBB91550123456789 should return false', () => {
    expect(validateIBAN({ value: 'BG18RZBB91550123456789' }).ibanInvalid).false;
  });
  it('validateIBAN for Costa Rica	CR23015108410026012345 should return false', () => {
    expect(validateIBAN({ value: 'CR23015108410026012345' }).ibanInvalid).false;
  });
  it('validateIBAN for Croatia HR1723600001101234565 should return false', () => {
    expect(validateIBAN({ value: 'HR1723600001101234565' }).ibanInvalid).false;
  });
  it('validateIBAN for Cyprus CY21002001950000357001234567 should return false', () => {
    expect(validateIBAN({ value: 'CY21002001950000357001234567' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Czech Republic	CZ5508000000001234567899 should return false', () => {
    expect(validateIBAN({ value: 'CZ5508000000001234567899' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Denmark DK9520000123456789 should return false', () => {
    expect(validateIBAN({ value: 'DK9520000123456789' }).ibanInvalid).false;
  });
  it('validateIBAN for Dominican Republic DO22ACAU00000000000123456789 should return false', () => {
    expect(validateIBAN({ value: 'DO22ACAU00000000000123456789' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Egypt EG800002000156789012345180002 should return false', () => {
    expect(validateIBAN({ value: 'EG800002000156789012345180002' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for El Salvador SV43ACAT00000000000000123123 should return false', () => {
    expect(validateIBAN({ value: 'SV43ACAT00000000000000123123' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Estonia EE471000001020145685 should return false', () => {
    expect(validateIBAN({ value: 'EE471000001020145685' }).ibanInvalid).false;
  });
  it('validateIBAN for Faroe Islands FO9264600123456789 should return false', () => {
    expect(validateIBAN({ value: 'FO9264600123456789' }).ibanInvalid).false;
  });
  it('validateIBAN for Finland FI1410093000123458 should return false', () => {
    expect(validateIBAN({ value: 'FI1410093000123458' }).ibanInvalid).false;
  });
  it('validateIBAN for France FR7630006000011234567890189 should return false', () => {
    expect(validateIBAN({ value: 'FR7630006000011234567890189' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Georgia GE60NB0000000123456789 should return false', () => {
    expect(validateIBAN({ value: 'GE60NB0000000123456789' }).ibanInvalid).false;
  });
  it('validateIBAN for Germany DE75512108001245126199 should return false', () => {
    expect(validateIBAN({ value: 'DE75512108001245126199' }).ibanInvalid).false;
  });
  it('validateIBAN for Gibraltar GI04BARC000001234567890 should return false', () => {
    expect(validateIBAN({ value: 'GI04BARC000001234567890' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Greece GR9608100010000001234567890 should return false', () => {
    expect(validateIBAN({ value: 'GR9608100010000001234567890' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Greenland GL8964710123456789 should return false', () => {
    expect(validateIBAN({ value: 'GL8964710123456789' }).ibanInvalid).false;
  });
  it('validateIBAN for Guatemala GT20AGRO00000000001234567890 should return false', () => {
    expect(validateIBAN({ value: 'GT20AGRO00000000001234567890' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Vatican VA59001123000012345678 should return false', () => {
    expect(validateIBAN({ value: 'VA59001123000012345678' }).ibanInvalid).false;
  });
  it('validateIBAN for Hungary HU93116000060000000012345676 should return false', () => {
    expect(validateIBAN({ value: 'HU93116000060000000012345676' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Iceland IS750001121234563108962099 should return false', () => {
    expect(validateIBAN({ value: 'IS750001121234563108962099' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Iraq IQ20CBIQ861800101010500 should return false', () => {
    expect(validateIBAN({ value: 'IQ20CBIQ861800101010500' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Ireland IE64IRCE92050112345678 should return false', () => {
    expect(validateIBAN({ value: 'IE64IRCE92050112345678' }).ibanInvalid).false;
  });
  it('validateIBAN for Israel IL170108000000012612345 should return false', () => {
    expect(validateIBAN({ value: 'IL170108000000012612345' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Italy IT60X0542811101000000123456 should return false', () => {
    expect(validateIBAN({ value: 'IT60X0542811101000000123456' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Jordan JO71CBJO0000000000001234567890 should return false', () => {
    expect(
      validateIBAN({ value: 'JO71CBJO0000000000001234567890' }).ibanInvalid
    ).false;
  });
  it('validateIBAN for Kazakhstan KZ563190000012344567 should return false', () => {
    expect(validateIBAN({ value: 'KZ563190000012344567' }).ibanInvalid).false;
  });
  it('validateIBAN for Kosovo XK051212012345678906 should return false', () => {
    expect(validateIBAN({ value: 'XK051212012345678906' }).ibanInvalid).false;
  });
  it('validateIBAN for Kuwait KW81CBKU0000000000001234560101 should return false', () => {
    expect(
      validateIBAN({ value: 'KW81CBKU0000000000001234560101' }).ibanInvalid
    ).false;
  });
  it('validateIBAN for Latvia LV97HABA0012345678910 should return false', () => {
    expect(validateIBAN({ value: 'LV97HABA0012345678910' }).ibanInvalid).false;
  });
  it('validateIBAN for Lebanon LB92000700000000123123456123 should return false', () => {
    expect(validateIBAN({ value: 'LB92000700000000123123456123' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Libya LY38021001000000123456789 should return false', () => {
    expect(validateIBAN({ value: 'LY38021001000000123456789' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Liechtenstein LI7408806123456789012 should return false', () => {
    expect(validateIBAN({ value: 'LI7408806123456789012' }).ibanInvalid).false;
  });
  it('validateIBAN for Lithuania LT601010012345678901 should return false', () => {
    expect(validateIBAN({ value: 'LT601010012345678901' }).ibanInvalid).false;
  });
  it('validateIBAN for Luxembourg LU120010001234567891 should return false', () => {
    expect(validateIBAN({ value: 'LU120010001234567891' }).ibanInvalid).false;
  });
  it('validateIBAN for Malta MT31MALT01100000000000000000123 should return false', () => {
    expect(
      validateIBAN({ value: 'MT31MALT01100000000000000000123' }).ibanInvalid
    ).false;
  });
  it('validateIBAN for Mauritania MR1300020001010000123456753 should return false', () => {
    expect(validateIBAN({ value: 'MR1300020001010000123456753' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Mauritius MU43BOMM0101123456789101000MUR should return false', () => {
    expect(
      validateIBAN({ value: 'MU43BOMM0101123456789101000MUR' }).ibanInvalid
    ).false;
  });
  it('validateIBAN for Moldova MD21EX000000000001234567 should return false', () => {
    expect(validateIBAN({ value: 'MD21EX000000000001234567' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Monaco MC5810096180790123456789085 should return false', () => {
    expect(validateIBAN({ value: 'MC5810096180790123456789085' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Montenegro ME25505000012345678951 should return false', () => {
    expect(validateIBAN({ value: 'ME25505000012345678951' }).ibanInvalid).false;
  });
  it('validateIBAN for Netherlands NL02ABNA0123456789 should return false', () => {
    expect(validateIBAN({ value: 'NL02ABNA0123456789' }).ibanInvalid).false;
  });
  it('validateIBAN for North Macedonia MK07200002785123453 should return false', () => {
    expect(validateIBAN({ value: 'MK07200002785123453' }).ibanInvalid).false;
  });
  it('validateIBAN for Norway NO8330001234567 should return false', () => {
    expect(validateIBAN({ value: 'NO8330001234567' }).ibanInvalid).false;
  });
  it('validateIBAN for Pakistan PK36SCBL0000001123456702 should return false', () => {
    expect(validateIBAN({ value: 'PK36SCBL0000001123456702' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Palestine PS92PALS000000000400123456702 should return false', () => {
    expect(validateIBAN({ value: 'PS92PALS000000000400123456702' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Poland PL10105000997603123456789123 should return false', () => {
    expect(validateIBAN({ value: 'PL10105000997603123456789123' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Portugal PT50002700000001234567833 should return false', () => {
    expect(validateIBAN({ value: 'PT50002700000001234567833' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Qatar QA54QNBA000000000000693123456 should return false', () => {
    expect(validateIBAN({ value: 'QA54QNBA000000000000693123456' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Romania RO09BCYP0000001234567890 should return false', () => {
    expect(validateIBAN({ value: 'RO09BCYP0000001234567890' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Saint Lucia LC14BOSL123456789012345678901234 should return false', () => {
    expect(
      validateIBAN({ value: 'LC14BOSL123456789012345678901234' }).ibanInvalid
    ).false;
  });
  it('validateIBAN for San Marino SM76P0854009812123456789123 should return false', () => {
    expect(validateIBAN({ value: 'SM76P0854009812123456789123' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Sao Tome and Principe ST23000200000289355710148 should return false', () => {
    expect(validateIBAN({ value: 'ST23000200000289355710148' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Saudi Arabia	SA4420000001234567891234 should return false', () => {
    expect(validateIBAN({ value: 'SA4420000001234567891234' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Serbia	RS35105008123123123173 should return false', () => {
    expect(validateIBAN({ value: 'RS35105008123123123173' }).ibanInvalid).false;
  });
  it('validateIBAN for Seychelles	SC52BAHL01031234567890123456USD should return false', () => {
    expect(
      validateIBAN({ value: 'SC52BAHL01031234567890123456USD' }).ibanInvalid
    ).false;
  });
  it('validateIBAN for Slovak Republic SK8975000000000012345671 should return false', () => {
    expect(validateIBAN({ value: 'SK8975000000000012345671' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Slovenia SI56192001234567892 should return false', () => {
    expect(validateIBAN({ value: 'SI56192001234567892' }).ibanInvalid).false;
  });
  it('validateIBAN for Spain ES7921000813610123456789 should return false', () => {
    expect(validateIBAN({ value: 'ES7921000813610123456789' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Sudan SD8811123456789012 should return false', () => {
    expect(validateIBAN({ value: 'SD8811123456789012' }).ibanInvalid).false;
  });
  it('validateIBAN for Sweden SE7280000810340009783242 should return false', () => {
    expect(validateIBAN({ value: 'SE7280000810340009783242' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Switzerland CH5604835012345678009 should return false', () => {
    expect(validateIBAN({ value: 'CH5604835012345678009' }).ibanInvalid).false;
  });
  it('validateIBAN for Timor-Leste TL380010012345678910106 should return false', () => {
    expect(validateIBAN({ value: 'TL380010012345678910106' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Tunisia TN5904018104004942712345 should return false', () => {
    expect(validateIBAN({ value: 'TN5904018104004942712345' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Turkey TR320010009999901234567890 should return false', () => {
    expect(validateIBAN({ value: 'TR320010009999901234567890' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for Ukraine UA903052992990004149123456789 should return false', () => {
    expect(validateIBAN({ value: 'UA903052992990004149123456789' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for United Arab Emirates	AE460090000000123456789 should return false', () => {
    expect(validateIBAN({ value: 'AE460090000000123456789' }).ibanInvalid)
      .false;
  });
  it('validateIBAN for United Kingdom	GB33BUKB20201555555555 should return false', () => {
    expect(validateIBAN({ value: 'GB33BUKB20201555555555' }).ibanInvalid).false;
  });
  it('validateIBAN for Virgin Islands, British VG21PACG0000000123456789 should return false', () => {
    expect(validateIBAN({ value: 'VG21PACG0000000123456789' }).ibanInvalid)
      .false;
  });
});
