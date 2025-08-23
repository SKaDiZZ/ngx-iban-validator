import { validateIBAN } from "../iban.validator";
import { IBANValidationResult } from "../types";

describe("validateIBAN", () => {
  it("should return invalid result when country code is unsupported", () => {
    const control = { value: "ZZ11123456789012345678" };
    const result: IBANValidationResult | null = validateIBAN(control);
    expect(result?.ibanInvalid).toBe(true);
    expect(result?.error).toEqual({
      countryUnsupported: true,
      codeLengthInvalid: false,
      patternInvalid: false,
    });
  });

  it("should return invalid result when IBAN length is incorrect", () => {
    const control = { value: "AT1112345678901234567" };
    const result: IBANValidationResult | null = validateIBAN(control);
    expect(result?.ibanInvalid).toBe(true);
    expect(result?.error).toEqual({
      countryUnsupported: false,
      codeLengthInvalid: true,
      patternInvalid: false,
    });
  });

  it("should return invalid result when IBAN pattern is incorrect", () => {
    const control = { value: "AT48320000W0D234F864" };
    const result: IBANValidationResult | null = validateIBAN(control);
    expect(result?.ibanInvalid).toBe(true);
    expect(result?.error).toEqual({
      countryUnsupported: false,
      codeLengthInvalid: false,
      patternInvalid: true,
    });
  });

  it("should return invalid result when country is supported but length is invalid", () => {
    const control = { value: "YE" };
    const result: IBANValidationResult | null = validateIBAN(control);
    expect(result?.ibanInvalid).toBe(true);
    expect(result?.error).toEqual({
      countryUnsupported: false,
      codeLengthInvalid: true,
      patternInvalid: false,
    });
  });

  it("should return valid result when IBAN is valid", () => {
    const control = { value: "AT611904300234573201" };
    const result: IBANValidationResult | null = validateIBAN(control);
    expect(result).toBe(null);
  });

  it("should return valid result when IBAN is passed as a string and not control value", () => {
    const value = "AT611904300234573201";
    const result: IBANValidationResult | null = validateIBAN(value);
    expect(result?.ibanInvalid).toBe(false);
  });

  it("validateIBAN for Albania AL35202111090000000001234567 should return null", () => {
    expect(validateIBAN({ value: "AL35202111090000000001234567" })).toBe(null);
  });

  it("validateIBAN for Algeria DZ580002100001113000000570 should return null", () => {
    expect(validateIBAN({ value: "DZ580002100001113000000570" })).toBe(null);
  });

  it("validateIBAN for Andorra AD1400080001001234567890 should return null", () => {
    expect(validateIBAN({ value: "AD1400080001001234567890" })).toBe(null);
  });

  it("validateIBAN for Angola AO06004400006729503010102 should return null", () => {
    expect(validateIBAN({ value: "AO06004400006729503010102" })).toBe(null);
  });

  it("validateIBAN for Austria AT483200000012345864 should return null", () => {
    expect(validateIBAN({ value: "AT483200000012345864" })).toBe(null);
  });

  it("validateIBAN for Azerbaijan AZ96AZEJ00000000001234567890 should return null", () => {
    expect(validateIBAN({ value: "AZ96AZEJ00000000001234567890" })).toBe(null);
  });

  it("validateIBAN for Bahrain BH02CITI00001077181611 should return null", () => {
    expect(validateIBAN({ value: "BH02CITI00001077181611" })).toBe(null);
  });

  it("validateIBAN for Belarus BY86AKBB10100000002966000000 should return null", () => {
    expect(validateIBAN({ value: "BY86AKBB10100000002966000000" })).toBe(null);
  });

  it("validateIBAN for Belgium BE71096123456769 should return null", () => {
    expect(validateIBAN({ value: "BE71096123456769" })).toBe(null);
  });

  it("validateIBAN for Benin BJ66BJ0610100100144390000769 should return null", () => {
    expect(validateIBAN({ value: "BJ66BJ0610100100144390000769" })).toBe(null);
  });

  it("validateIBAN for Bosnia and Herzegovina	BA393385804800211234 should return null", () => {
    expect(validateIBAN({ value: "BA393385804800211234" })).toBe(null);
  });

  it("validateIBAN for Brazil	BR1500000000000010932840814P2 should return null", () => {
    expect(validateIBAN({ value: "BR1500000000000010932840814P2" })).toBe(null);
  });

  it("validateIBAN for Bulgaria	BG18RZBB91550123456789 should return null", () => {
    expect(validateIBAN({ value: "BG18RZBB91550123456789" })).toBe(null);
  });

  it("validateIBAN for Burundi BI1320001100010000123456789 should return null", () => {
    expect(validateIBAN({ value: "BI1320001100010000123456789" })).toBe(null);
  });

  it("validateIBAN for Burkina Faso BF42BF0840101300463574000390 should return null", () => {
    expect(validateIBAN({ value: "BF42BF0840101300463574000390" })).toBe(null);
  });

  it("validateIBAN for Cameroon	CM2110002000300277976315008 should return null", () => {
    expect(validateIBAN({ value: "CM2110002000300277976315008" })).toBe(null);
  });

  it("validateIBAN for Cape Verde	CV64000500000020108215144 should return null", () => {
    expect(validateIBAN({ value: "CV64000500000020108215144" })).toBe(null);
  });

  it("validateIBAN for Central African Republic CF4220001000010120069700160 should return null", () => {
    expect(validateIBAN({ value: "CF4220001000010120069700160" })).toBe(null);
  });

  it("validateIBAN for Chad TD8960002000010271091600153 should return null", () => {
    expect(validateIBAN({ value: "TD8960002000010271091600153" })).toBe(null);
  });

  it("validateIBAN for Comoros KM4600005000010010904400137 should return null", () => {
    expect(validateIBAN({ value: "KM4600005000010010904400137" })).toBe(null);
  });

  it("validateIBAN for Congo CG3930011000101013451300019 should return null", () => {
    expect(validateIBAN({ value: "CG3930011000101013451300019" })).toBe(null);
  });

  it("validateIBAN for Costa Rica	CR23015108410026012345 should return null", () => {
    expect(validateIBAN({ value: "CR23015108410026012345" })).toBe(null);
  });

  it("validateIBAN for Croatia HR1723600001101234565 should return null", () => {
    expect(validateIBAN({ value: "HR1723600001101234565" })).toBe(null);
  });

  it("validateIBAN for Cyprus CY21002001950000357001234567 should return null", () => {
    expect(validateIBAN({ value: "CY21002001950000357001234567" })).toBe(null);
  });

  it("validateIBAN for Czech Republic	CZ5508000000001234567899 should return null", () => {
    expect(validateIBAN({ value: "CZ5508000000001234567899" })).toBe(null);
  });

  it("validateIBAN for Denmark DK9520000123456789 should return null", () => {
    expect(validateIBAN({ value: "DK9520000123456789" })).toBe(null);
  });

  it("validateIBAN for Djibouti DJ2110002010010409943020008 should return null", () => {
    expect(validateIBAN({ value: "DJ2110002010010409943020008" })).toBe(null);
  });

  it("validateIBAN for Dominican Republic DO22ACAU00000000000123456789 should return null", () => {
    expect(validateIBAN({ value: "DO22ACAU00000000000123456789" })).toBe(null);
  });

  it("validateIBAN for Egypt EG800002000156789012345180002 should return null", () => {
    expect(validateIBAN({ value: "EG800002000156789012345180002" })).toBe(null);
  });

  it("validateIBAN for El Salvador SV43ACAT00000000000000123123 should return null", () => {
    expect(validateIBAN({ value: "SV43ACAT00000000000000123123" })).toBe(null);
  });

  it("validateIBAN for Equatorial Guinea GQ7050002001003715228190196 should return null", () => {
    expect(validateIBAN({ value: "GQ7050002001003715228190196" })).toBe(null);
  });

  it("validateIBAN for Estonia EE471000001020145685 should return null", () => {
    expect(validateIBAN({ value: "EE471000001020145685" })).toBe(null);
  });

  it("validateIBAN for Falkland Islands FK12SC987654321098 should return null", () => {
    expect(validateIBAN({ value: "FK12SC987654321098" })).toBe(null);
  });

  it("validateIBAN for Faroe Islands FO9264600123456789 should return null", () => {
    expect(validateIBAN({ value: "FO9264600123456789" })).toBe(null);
  });

  it("validateIBAN for Finland FI1410093000123458 should return null", () => {
    expect(validateIBAN({ value: "FI1410093000123458" })).toBe(null);
  });

  it("validateIBAN for France FR7630006000011234567890189 should return null", () => {
    expect(validateIBAN({ value: "FR7630006000011234567890189" })).toBe(null);
  });

  it("validateIBAN for Gabon GA2140021010032001890020126 should return null", () => {
    expect(validateIBAN({ value: "GA2140021010032001890020126" })).toBe(null);
  });

  it("validateIBAN for Georgia GE60NB0000000123456789 should return null", () => {
    expect(validateIBAN({ value: "GE60NB0000000123456789" })).toBe(null);
  });

  it("validateIBAN for Germany DE75512108001245126199 should return null", () => {
    expect(validateIBAN({ value: "DE75512108001245126199" })).toBe(null);
  });

  it("validateIBAN for Gibraltar GI04BARC000001234567890 should return null", () => {
    expect(validateIBAN({ value: "GI04BARC000001234567890" })).toBe(null);
  });

  it("validateIBAN for Greece GR9608100010000001234567890 should return null", () => {
    expect(validateIBAN({ value: "GR9608100010000001234567890" })).toBe(null);
  });

  it("validateIBAN for Greenland GL8964710123456789 should return null", () => {
    expect(validateIBAN({ value: "GL8964710123456789" })).toBe(null);
  });

  it("validateIBAN for Guatemala GT20AGRO00000000001234567890 should return null", () => {
    expect(validateIBAN({ value: "GT20AGRO00000000001234567890" })).toBe(null);
  });

  it("validateIBAN for Guinea-Bissau GW04GW1430010181800637601 should return null", () => {
    expect(validateIBAN({ value: "GW04GW1430010181800637601" })).toBe(null);
  });

  it("validateIBAN for Vatican VA59001123000012345678 should return null", () => {
    expect(validateIBAN({ value: "VA59001123000012345678" })).toBe(null);
  });

  it("validateIBAN for Honduras HN54PISA00000000000000123124 should return null", () => {
    expect(validateIBAN({ value: "HN54PISA00000000000000123124" })).toBe(null);
  });

  it("validateIBAN for Hungary HU93116000060000000012345676 should return null", () => {
    expect(validateIBAN({ value: "HU93116000060000000012345676" })).toBe(null);
  });

  it("validateIBAN for Iceland IS750001121234563108962099 should return null", () => {
    expect(validateIBAN({ value: "IS750001121234563108962099" })).toBe(null);
  });

  it("validateIBAN for Iran IR710570029971601460641001 should return null", () => {
    expect(validateIBAN({ value: "IR710570029971601460641001" })).toBe(null);
  });

  it("validateIBAN for Iraq IQ20CBIQ861800101010500 should return null", () => {
    expect(validateIBAN({ value: "IQ20CBIQ861800101010500" })).toBe(null);
  });

  it("validateIBAN for Ireland IE64IRCE92050112345678 should return null", () => {
    expect(validateIBAN({ value: "IE64IRCE92050112345678" })).toBe(null);
  });

  it("validateIBAN for Israel IL170108000000012612345 should return null", () => {
    expect(validateIBAN({ value: "IL170108000000012612345" })).toBe(null);
  });

  it("validateIBAN for Italy IT60X0542811101000000123456 should return null", () => {
    expect(validateIBAN({ value: "IT60X0542811101000000123456" })).toBe(null);
  });

  it("validateIBAN for Ivory Coast CI93CI0080111301134291200589 should return null", () => {
    expect(validateIBAN({ value: "CI93CI0080111301134291200589" })).toBe(null);
  });

  it("validateIBAN for Jordan JO71CBJO0000000000001234567890 should return null", () => {
    expect(validateIBAN({ value: "JO71CBJO0000000000001234567890" })).toBe(
      null
    );
  });

  it("validateIBAN for Kazakhstan KZ563190000012344567 should return null", () => {
    expect(validateIBAN({ value: "KZ563190000012344567" })).toBe(null);
  });

  it("validateIBAN for Kosovo XK051212012345678906 should return null", () => {
    expect(validateIBAN({ value: "XK051212012345678906" })).toBe(null);
  });

  it("validateIBAN for Kuwait KW81CBKU0000000000001234560101 should return null", () => {
    expect(validateIBAN({ value: "KW81CBKU0000000000001234560101" })).toBe(
      null
    );
  });

  it("validateIBAN for Latvia LV97HABA0012345678910 should return null", () => {
    expect(validateIBAN({ value: "LV97HABA0012345678910" })).toBe(null);
  });

  it("validateIBAN for Lebanon LB92000700000000123123456123 should return null", () => {
    expect(validateIBAN({ value: "LB92000700000000123123456123" })).toBe(null);
  });

  it("validateIBAN for Libya LY38021001000000123456789 should return null", () => {
    expect(validateIBAN({ value: "LY38021001000000123456789" })).toBe(null);
  });

  it("validateIBAN for Liechtenstein LI7408806123456789012 should return null", () => {
    expect(validateIBAN({ value: "LI7408806123456789012" })).toBe(null);
  });

  it("validateIBAN for Lithuania LT601010012345678901 should return null", () => {
    expect(validateIBAN({ value: "LT601010012345678901" })).toBe(null);
  });

  it("validateIBAN for Luxembourg LU120010001234567891 should return null", () => {
    expect(validateIBAN({ value: "LU120010001234567891" })).toBe(null);
  });

  it("validateIBAN for Madagascar MG4600005030071289421016045 should return null", () => {
    expect(validateIBAN({ value: "MG4600005030071289421016045" })).toBe(null);
  });

  it("validateIBAN for Mali ML13ML0160120102600100668497 should return null", () => {
    expect(validateIBAN({ value: "ML13ML0160120102600100668497" })).toBe(null);
  });

  it("validateIBAN for Malta MT31MALT01100000000000000000123 should return null", () => {
    expect(validateIBAN({ value: "MT31MALT01100000000000000000123" })).toBe(
      null
    );
  });

  it("validateIBAN for Mauritania MR1300020001010000123456753 should return null", () => {
    expect(validateIBAN({ value: "MR1300020001010000123456753" })).toBe(null);
  });

  it("validateIBAN for Mauritius MU43BOMM0101123456789101000MUR should return null", () => {
    expect(validateIBAN({ value: "MU43BOMM0101123456789101000MUR" })).toBe(
      null
    );
  });

  it("validateIBAN for Moldova MD21EX000000000001234567 should return null", () => {
    expect(validateIBAN({ value: "MD21EX000000000001234567" })).toBe(null);
  });

  it("validateIBAN for Monaco MC5810096180790123456789085 should return null", () => {
    expect(validateIBAN({ value: "MC5810096180790123456789085" })).toBe(null);
  });

  it("validateIBAN for Mongolia MN580050099123456789 should return null", () => {
    expect(validateIBAN({ value: "MN580050099123456789" })).toBe(null);
  });

  it("validateIBAN for Montenegro ME25505000012345678951 should return null", () => {
    expect(validateIBAN({ value: "ME25505000012345678951" })).toBe(null);
  });

  it("validateIBAN for Morocco MA64011519000001205000534921 should return null", () => {
    expect(validateIBAN({ value: "MA64011519000001205000534921" })).toBe(null);
  });

  it("validateIBAN for Mozambique MZ59000301080016367102371 should return null", () => {
    expect(validateIBAN({ value: "MZ59000301080016367102371" })).toBe(null);
  });

  it("validateIBAN for Netherlands NL02ABNA0123456789 should return null", () => {
    expect(validateIBAN({ value: "NL02ABNA0123456789" })).toBe(null);
  });

  it("validateIBAN for Nicaragua NI79BAMC00000000000003123123 should return null", () => {
    expect(validateIBAN({ value: "NI79BAMC00000000000003123123" })).toBe(null);
  });

  it("validateIBAN for Niger NE58NE0380100100130305000268 should return null", () => {
    expect(validateIBAN({ value: "NE58NE0380100100130305000268" })).toBe(null);
  });

  it("validateIBAN for North Macedonia MK07200002785123453 should return null", () => {
    expect(validateIBAN({ value: "MK07200002785123453" })).toBe(null);
  });

  it("validateIBAN for Norway NO8330001234567 should return null", () => {
    expect(validateIBAN({ value: "NO8330001234567" })).toBe(null);
  });

  it("validateIBAN for Pakistan PK36SCBL0000001123456702 should return null", () => {
    expect(validateIBAN({ value: "PK36SCBL0000001123456702" })).toBe(null);
  });

  it("validateIBAN for Palestine PS92PALS000000000400123456702 should return null", () => {
    expect(validateIBAN({ value: "PS92PALS000000000400123456702" })).toBe(null);
  });

  it("validateIBAN for Poland PL10105000997603123456789123 should return null", () => {
    expect(validateIBAN({ value: "PL10105000997603123456789123" })).toBe(null);
  });

  it("validateIBAN for Portugal PT50002700000001234567833 should return null", () => {
    expect(validateIBAN({ value: "PT50002700000001234567833" })).toBe(null);
  });

  it("validateIBAN for Qatar QA54QNBA000000000000693123456 should return null", () => {
    expect(validateIBAN({ value: "QA54QNBA000000000000693123456" })).toBe(null);
  });

  it("validateIBAN for Romania RO09BCYP0000001234567890 should return null", () => {
    expect(validateIBAN({ value: "RO09BCYP0000001234567890" })).toBe(null);
  });

  it("validateIBAN for Russia RU0204452560040702810412345678901 should return null", () => {
    expect(validateIBAN({ value: "RU0204452560040702810412345678901" })).toBe(
      null
    );
  });

  it("validateIBAN for Saint Lucia LC14BOSL123456789012345678901234 should return null", () => {
    expect(validateIBAN({ value: "LC14BOSL123456789012345678901234" })).toBe(
      null
    );
  });

  it("validateIBAN for San Marino SM76P0854009812123456789123 should return null", () => {
    expect(validateIBAN({ value: "SM76P0854009812123456789123" })).toBe(null);
  });

  it("validateIBAN for Sao Tome and Principe ST23000200000289355710148 should return null", () => {
    expect(validateIBAN({ value: "ST23000200000289355710148" })).toBe(null);
  });

  it("validateIBAN for Saudi Arabia	SA4420000001234567891234 should return null", () => {
    expect(validateIBAN({ value: "SA4420000001234567891234" })).toBe(null);
  });

  it("validateIBAN for Senegal SN08SN0100152000048500003035 should return null", () => {
    expect(validateIBAN({ value: "SN08SN0100152000048500003035" })).toBe(null);
  });

  it("validateIBAN for Serbia	RS35105008123123123173 should return null", () => {
    expect(validateIBAN({ value: "RS35105008123123123173" })).toBe(null);
  });

  it("validateIBAN for Seychelles	SC52BAHL01031234567890123456USD should return null", () => {
    expect(validateIBAN({ value: "SC52BAHL01031234567890123456USD" })).toBe(
      null
    );
  });

  it("validateIBAN for Slovak Republic SK8975000000000012345671 should return null", () => {
    expect(validateIBAN({ value: "SK8975000000000012345671" })).toBe(null);
  });

  it("validateIBAN for Slovenia SI56192001234567892 should return null", () => {
    expect(validateIBAN({ value: "SI56192001234567892" })).toBe(null);
  });

  it("validateIBAN for Somalia ES7921000813610123456789 should return null", () => {
    expect(validateIBAN({ value: "SO061000001123123456789" })).toBe(null);
  });

  it("validateIBAN for Spain ES7921000813610123456789 should return null", () => {
    expect(validateIBAN({ value: "ES7921000813610123456789" })).toBe(null);
  });

  it("validateIBAN for Sudan SD8811123456789012 should return null", () => {
    expect(validateIBAN({ value: "SD8811123456789012" })).toBe(null);
  });

  it("validateIBAN for Sultanate of Oman OM040280000012345678901 should return null", () => {
    expect(validateIBAN({ value: "OM040280000012345678901" })).toBe(null);
  });

  it("validateIBAN for Sweden SE7280000810340009783242 should return null", () => {
    expect(validateIBAN({ value: "SE7280000810340009783242" })).toBe(null);
  });

  it("validateIBAN for Switzerland CH5604835012345678009 should return null", () => {
    expect(validateIBAN({ value: "CH5604835012345678009" })).toBe(null);
  });

  it("validateIBAN for Timor-Leste TL380010012345678910106 should return null", () => {
    expect(validateIBAN({ value: "TL380010012345678910106" })).toBe(null);
  });

  it("validateIBAN for Togo TG53TG0090604310346500400070 should return null", () => {
    expect(validateIBAN({ value: "TG53TG0090604310346500400070" })).toBe(null);
  });

  it("validateIBAN for Tunisia TN5904018104004942712345 should return null", () => {
    expect(validateIBAN({ value: "TN5904018104004942712345" })).toBe(null);
  });

  it("validateIBAN for Turkey TR320010009999901234567890 should return null", () => {
    expect(validateIBAN({ value: "TR320010009999901234567890" })).toBe(null);
  });

  it("validateIBAN for Ukraine UA903052992990004149123456789 should return null", () => {
    expect(validateIBAN({ value: "UA903052992990004149123456789" })).toBe(null);
  });

  it("validateIBAN for United Arab Emirates	AE460090000000123456789 should return null", () => {
    expect(validateIBAN({ value: "AE460090000000123456789" })).toBe(null);
  });

  it("validateIBAN for United Kingdom	GB33BUKB20201555555555 should return null", () => {
    expect(validateIBAN({ value: "GB33BUKB20201555555555" })).toBe(null);
  });

  it("validateIBAN for Virgin Islands, British VG21PACG0000000123456789 should return null", () => {
    expect(validateIBAN({ value: "VG21PACG0000000123456789" })).toBe(null);
  });

  it("validateIBAN for Yemen YE09CBKU0000000000001234560101 should return null", () => {
    expect(validateIBAN({ value: "YE09CBKU0000000000001234560101" })).toBe(
      null
    );
  });
});
