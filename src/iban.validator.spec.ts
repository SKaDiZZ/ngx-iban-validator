import { IBANValidationResult, validateIBAN } from "./iban.validator";

describe("validateIBAN", () => {
  it("should return invalid result when country code is unsupported", () => {
    const control = { value: "ZZ11123456789012345678" };
    const result: IBANValidationResult = validateIBAN(control);
    expect(result.ibanInvalid).toBe(true);
    expect(result.error).toEqual({
      countryUnsupported: true,
      codeLengthInvalid: false,
      patternInvalid: false,
    });
  });

  it("should return invalid result when IBAN length is incorrect", () => {
    const control = { value: "AT1112345678901234567" };
    const result: IBANValidationResult = validateIBAN(control);
    expect(result.ibanInvalid).toBe(true);
    expect(result.error).toEqual({
      countryUnsupported: false,
      codeLengthInvalid: true,
      patternInvalid: false,
    });
  });

  it("should return invalid result when IBAN pattern is incorrect", () => {
    const control = { value: "AT48320000W0D234F864" };
    const result: IBANValidationResult = validateIBAN(control);
    expect(result.ibanInvalid).toBe(true);
    expect(result.error).toEqual({
      countryUnsupported: false,
      codeLengthInvalid: false,
      patternInvalid: true,
    });
  });

  it("should return valid result when IBAN is valid", () => {
    const control = { value: "AT611904300234573201" };
    const result: IBANValidationResult = validateIBAN(control);
    expect(result.ibanInvalid).toBe(false);
    expect(result.error).toBe(null);
  });

  it("validateIBAN for Albania AL35202111090000000001234567 should return false", () => {
    expect(
      validateIBAN({ value: "AL35202111090000000001234567" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Algeria DZ580002100001113000000570 should return false", () => {
    expect(
      validateIBAN({ value: "DZ580002100001113000000570" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Andorra AD1400080001001234567890 should return false", () => {
    expect(
      validateIBAN({ value: "AD1400080001001234567890" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Angola AO06004400006729503010102 should return false", () => {
    expect(
      validateIBAN({ value: "AO06004400006729503010102" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Austria AT483200000012345864 should return false", () => {
    expect(validateIBAN({ value: "AT483200000012345864" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Azerbaijan AZ96AZEJ00000000001234567890 should return false", () => {
    expect(
      validateIBAN({ value: "AZ96AZEJ00000000001234567890" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Bahrain BH02CITI00001077181611 should return false", () => {
    expect(validateIBAN({ value: "BH02CITI00001077181611" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Belarus BY86AKBB10100000002966000000 should return false", () => {
    expect(
      validateIBAN({ value: "BY86AKBB10100000002966000000" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Belgium BE71096123456769 should return false", () => {
    expect(validateIBAN({ value: "BE71096123456769" }).ibanInvalid).toBe(false);
  });

  it("validateIBAN for Benin BJ66BJ0610100100144390000769 should return false", () => {
    expect(
      validateIBAN({ value: "BJ66BJ0610100100144390000769" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Bosnia and Herzegovina	BA393385804800211234 should return false", () => {
    expect(validateIBAN({ value: "BA393385804800211234" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Brazil	BR1500000000000010932840814P2 should return false", () => {
    expect(
      validateIBAN({ value: "BR1500000000000010932840814P2" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Bulgaria	BG18RZBB91550123456789 should return false", () => {
    expect(validateIBAN({ value: "BG18RZBB91550123456789" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Burundi BI43201011067444 should return false", () => {
    expect(validateIBAN({ value: "BI43201011067444" }).ibanInvalid).toBe(false);
  });

  it("validateIBAN for Burkina Faso BF42BF0840101300463574000390 should return false", () => {
    expect(
      validateIBAN({ value: "BF42BF0840101300463574000390" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Cameroon	CM2110002000300277976315008 should return false", () => {
    expect(
      validateIBAN({ value: "CM2110002000300277976315008" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Cape Verde	CV64000500000020108215144 should return false", () => {
    expect(
      validateIBAN({ value: "CV64000500000020108215144" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Central African Republic CF4220001000010120069700160 should return false", () => {
    expect(
      validateIBAN({ value: "CF4220001000010120069700160" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Chad TD8960002000010271091600153 should return false", () => {
    expect(
      validateIBAN({ value: "TD8960002000010271091600153" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Comoros KM4600005000010010904400137 should return false", () => {
    expect(
      validateIBAN({ value: "KM4600005000010010904400137" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Congo CG3930011000101013451300019 should return false", () => {
    expect(
      validateIBAN({ value: "CG3930011000101013451300019" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Costa Rica	CR23015108410026012345 should return false", () => {
    expect(validateIBAN({ value: "CR23015108410026012345" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Croatia HR1723600001101234565 should return false", () => {
    expect(validateIBAN({ value: "HR1723600001101234565" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Cyprus CY21002001950000357001234567 should return false", () => {
    expect(
      validateIBAN({ value: "CY21002001950000357001234567" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Czech Republic	CZ5508000000001234567899 should return false", () => {
    expect(
      validateIBAN({ value: "CZ5508000000001234567899" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Denmark DK9520000123456789 should return false", () => {
    expect(validateIBAN({ value: "DK9520000123456789" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Dominican Republic DO22ACAU00000000000123456789 should return false", () => {
    expect(
      validateIBAN({ value: "DO22ACAU00000000000123456789" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Egypt EG800002000156789012345180002 should return false", () => {
    expect(
      validateIBAN({ value: "EG800002000156789012345180002" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for El Salvador SV43ACAT00000000000000123123 should return false", () => {
    expect(
      validateIBAN({ value: "SV43ACAT00000000000000123123" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Equatorial Guinea GQ7050002001003715228190196 should return false", () => {
    expect(
      validateIBAN({ value: "GQ7050002001003715228190196" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Estonia EE471000001020145685 should return false", () => {
    expect(validateIBAN({ value: "EE471000001020145685" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Faroe Islands FO9264600123456789 should return false", () => {
    expect(validateIBAN({ value: "FO9264600123456789" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Finland FI1410093000123458 should return false", () => {
    expect(validateIBAN({ value: "FI1410093000123458" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for France FR7630006000011234567890189 should return false", () => {
    expect(
      validateIBAN({ value: "FR7630006000011234567890189" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Gabon GA2140021010032001890020126 should return false", () => {
    expect(
      validateIBAN({ value: "GA2140021010032001890020126" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Georgia GE60NB0000000123456789 should return false", () => {
    expect(validateIBAN({ value: "GE60NB0000000123456789" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Germany DE75512108001245126199 should return false", () => {
    expect(validateIBAN({ value: "DE75512108001245126199" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Gibraltar GI04BARC000001234567890 should return false", () => {
    expect(validateIBAN({ value: "GI04BARC000001234567890" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Greece GR9608100010000001234567890 should return false", () => {
    expect(
      validateIBAN({ value: "GR9608100010000001234567890" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Greenland GL8964710123456789 should return false", () => {
    expect(validateIBAN({ value: "GL8964710123456789" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Guatemala GT20AGRO00000000001234567890 should return false", () => {
    expect(
      validateIBAN({ value: "GT20AGRO00000000001234567890" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Guinea-Bissau GW04GW1430010181800637601 should return false", () => {
    expect(
      validateIBAN({ value: "GW04GW1430010181800637601" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Vatican VA59001123000012345678 should return false", () => {
    expect(validateIBAN({ value: "VA59001123000012345678" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Honduras HN54PISA00000000000000123124 should return false", () => {
    expect(
      validateIBAN({ value: "HN54PISA00000000000000123124" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Hungary HU93116000060000000012345676 should return false", () => {
    expect(
      validateIBAN({ value: "HU93116000060000000012345676" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Iceland IS750001121234563108962099 should return false", () => {
    expect(
      validateIBAN({ value: "IS750001121234563108962099" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Iran IR710570029971601460641001 should return false", () => {
    expect(
      validateIBAN({ value: "IR710570029971601460641001" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Iraq IQ20CBIQ861800101010500 should return false", () => {
    expect(validateIBAN({ value: "IQ20CBIQ861800101010500" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Ireland IE64IRCE92050112345678 should return false", () => {
    expect(validateIBAN({ value: "IE64IRCE92050112345678" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Israel IL170108000000012612345 should return false", () => {
    expect(validateIBAN({ value: "IL170108000000012612345" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Italy IT60X0542811101000000123456 should return false", () => {
    expect(
      validateIBAN({ value: "IT60X0542811101000000123456" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Ivory Coast CI93CI0080111301134291200589 should return false", () => {
    expect(
      validateIBAN({ value: "CI93CI0080111301134291200589" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Jordan JO71CBJO0000000000001234567890 should return false", () => {
    expect(
      validateIBAN({ value: "JO71CBJO0000000000001234567890" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Kazakhstan KZ563190000012344567 should return false", () => {
    expect(validateIBAN({ value: "KZ563190000012344567" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Kosovo XK051212012345678906 should return false", () => {
    expect(validateIBAN({ value: "XK051212012345678906" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Kuwait KW81CBKU0000000000001234560101 should return false", () => {
    expect(
      validateIBAN({ value: "KW81CBKU0000000000001234560101" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Latvia LV97HABA0012345678910 should return false", () => {
    expect(validateIBAN({ value: "LV97HABA0012345678910" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Lebanon LB92000700000000123123456123 should return false", () => {
    expect(
      validateIBAN({ value: "LB92000700000000123123456123" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Libya LY38021001000000123456789 should return false", () => {
    expect(
      validateIBAN({ value: "LY38021001000000123456789" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Liechtenstein LI7408806123456789012 should return false", () => {
    expect(validateIBAN({ value: "LI7408806123456789012" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Lithuania LT601010012345678901 should return false", () => {
    expect(validateIBAN({ value: "LT601010012345678901" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Luxembourg LU120010001234567891 should return false", () => {
    expect(validateIBAN({ value: "LU120010001234567891" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Madagascar MG4600005030071289421016045 should return false", () => {
    expect(
      validateIBAN({ value: "MG4600005030071289421016045" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Mali ML13ML0160120102600100668497 should return false", () => {
    expect(
      validateIBAN({ value: "ML13ML0160120102600100668497" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Malta MT31MALT01100000000000000000123 should return false", () => {
    expect(
      validateIBAN({ value: "MT31MALT01100000000000000000123" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Mauritania MR1300020001010000123456753 should return false", () => {
    expect(
      validateIBAN({ value: "MR1300020001010000123456753" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Mauritius MU43BOMM0101123456789101000MUR should return false", () => {
    expect(
      validateIBAN({ value: "MU43BOMM0101123456789101000MUR" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Moldova MD21EX000000000001234567 should return false", () => {
    expect(
      validateIBAN({ value: "MD21EX000000000001234567" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Monaco MC5810096180790123456789085 should return false", () => {
    expect(
      validateIBAN({ value: "MC5810096180790123456789085" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Mongolia MN580050099123456789 should return false", () => {
    expect(validateIBAN({ value: "MN580050099123456789" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Montenegro ME25505000012345678951 should return false", () => {
    expect(validateIBAN({ value: "ME25505000012345678951" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Morocco MA64011519000001205000534921 should return false", () => {
    expect(
      validateIBAN({ value: "MA64011519000001205000534921" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Mozambique MZ59000301080016367102371 should return false", () => {
    expect(
      validateIBAN({ value: "MZ59000301080016367102371" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Netherlands NL02ABNA0123456789 should return false", () => {
    expect(validateIBAN({ value: "NL02ABNA0123456789" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Nicaragua NI92BAMC000000000000000003123123 should return false", () => {
    expect(
      validateIBAN({ value: "NI92BAMC000000000000000003123123" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Niger NE58NE0380100100130305000268 should return false", () => {
    expect(
      validateIBAN({ value: "NE58NE0380100100130305000268" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for North Macedonia MK07200002785123453 should return false", () => {
    expect(validateIBAN({ value: "MK07200002785123453" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Norway NO8330001234567 should return false", () => {
    expect(validateIBAN({ value: "NO8330001234567" }).ibanInvalid).toBe(false);
  });

  it("validateIBAN for Pakistan PK36SCBL0000001123456702 should return false", () => {
    expect(
      validateIBAN({ value: "PK36SCBL0000001123456702" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Palestine PS92PALS000000000400123456702 should return false", () => {
    expect(
      validateIBAN({ value: "PS92PALS000000000400123456702" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Poland PL10105000997603123456789123 should return false", () => {
    expect(
      validateIBAN({ value: "PL10105000997603123456789123" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Portugal PT50002700000001234567833 should return false", () => {
    expect(
      validateIBAN({ value: "PT50002700000001234567833" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Qatar QA54QNBA000000000000693123456 should return false", () => {
    expect(
      validateIBAN({ value: "QA54QNBA000000000000693123456" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Romania RO09BCYP0000001234567890 should return false", () => {
    expect(
      validateIBAN({ value: "RO09BCYP0000001234567890" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Russia RU0204452560040702810412345678901 should return false", () => {
    expect(
      validateIBAN({ value: "RU0204452560040702810412345678901" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Saint Lucia LC14BOSL123456789012345678901234 should return false", () => {
    expect(
      validateIBAN({ value: "LC14BOSL123456789012345678901234" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for San Marino SM76P0854009812123456789123 should return false", () => {
    expect(
      validateIBAN({ value: "SM76P0854009812123456789123" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Sao Tome and Principe ST23000200000289355710148 should return false", () => {
    expect(
      validateIBAN({ value: "ST23000200000289355710148" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Saudi Arabia	SA4420000001234567891234 should return false", () => {
    expect(
      validateIBAN({ value: "SA4420000001234567891234" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Senegal SN08SN0100152000048500003035 should return false", () => {
    expect(
      validateIBAN({ value: "SN08SN0100152000048500003035" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Serbia	RS35105008123123123173 should return false", () => {
    expect(validateIBAN({ value: "RS35105008123123123173" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Seychelles	SC52BAHL01031234567890123456USD should return false", () => {
    expect(
      validateIBAN({ value: "SC52BAHL01031234567890123456USD" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Slovak Republic SK8975000000000012345671 should return false", () => {
    expect(
      validateIBAN({ value: "SK8975000000000012345671" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Slovenia SI56192001234567892 should return false", () => {
    expect(validateIBAN({ value: "SI56192001234567892" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Spain ES7921000813610123456789 should return false", () => {
    expect(
      validateIBAN({ value: "ES7921000813610123456789" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Sudan SD8811123456789012 should return false", () => {
    expect(validateIBAN({ value: "SD8811123456789012" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Sweden SE7280000810340009783242 should return false", () => {
    expect(
      validateIBAN({ value: "SE7280000810340009783242" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Switzerland CH5604835012345678009 should return false", () => {
    expect(validateIBAN({ value: "CH5604835012345678009" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Timor-Leste TL380010012345678910106 should return false", () => {
    expect(validateIBAN({ value: "TL380010012345678910106" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Togo TG53TG0090604310346500400070 should return false", () => {
    expect(
      validateIBAN({ value: "TG53TG0090604310346500400070" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Tunisia TN5904018104004942712345 should return false", () => {
    expect(
      validateIBAN({ value: "TN5904018104004942712345" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Turkey TR320010009999901234567890 should return false", () => {
    expect(
      validateIBAN({ value: "TR320010009999901234567890" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for Ukraine UA903052992990004149123456789 should return false", () => {
    expect(
      validateIBAN({ value: "UA903052992990004149123456789" }).ibanInvalid
    ).toBe(false);
  });

  it("validateIBAN for United Arab Emirates	AE460090000000123456789 should return false", () => {
    expect(validateIBAN({ value: "AE460090000000123456789" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for United Kingdom	GB33BUKB20201555555555 should return false", () => {
    expect(validateIBAN({ value: "GB33BUKB20201555555555" }).ibanInvalid).toBe(
      false
    );
  });

  it("validateIBAN for Virgin Islands, British VG21PACG0000000123456789 should return false", () => {
    expect(
      validateIBAN({ value: "VG21PACG0000000123456789" }).ibanInvalid
    ).toBe(false);
  });
});
