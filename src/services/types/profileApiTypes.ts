// ============================================
// profileApiTypes.ts
// ============================================
export interface ProfileInfo {
  name: string;
  memberId: string;
  mobileNumber: string;
  email: string;
  dob: string;
  outletName: string;
  isBlackList: boolean | null;
  isBlocked: boolean;
  status?: string | null;
}

export interface Address {
  building: string;
  city: string;
  state: string;
  pinCode: string;
}

export interface OutletAddress {
  outletBuilding: string;
  outletCity: string;
  outletState: string;
  outletPinCode: string;
}

export interface Bank {
  id: number;
  bankName: string;
  accountName: string;
  accountNo: string;
  ifcscode: string;
  verified: boolean;
}

export interface KycDocs {
  aadhaarCardFrontImage?: string | null;
  aadhaarCardBackImage?: string | null;
  panCardImage?: string | null;
  shopImage?: string | null;
  businessProofImage?: string | null;
}

export interface MemberProfileData {
  info: ProfileInfo;
  address: Address;
  outletAddress: OutletAddress;
  myBanksList: Bank[];
  kycDocs: KycDocs;
}

export interface MemberProfileResponse {
  statusCode: number;
  message: string;
  data: MemberProfileData;
}

export interface WalletBalanceData {
  prepaidBalance: number;
  postpaidBalance: number;
}

export interface WalletBalanceResponse {
  statusCode: number;
  message: string;
  data: WalletBalanceData;
}

export interface SubProduct {
  id: string;
  subProduct_name: string;
  subProduct_code: string | null;
}

export interface SubProductDropdownResponse {
  statusCode: number;
  message: string;
  data: SubProduct[];
}
