export interface CustomerProfile {
  id: number;
  createdAt: number;
  updatedAt: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  avatar: string;
  isAcceptMarketing: boolean;
  referralSource: string;
  dob: string;
  note: string;
  // Address
  address: string;
  city: string;
  state: string;
  isBlocked: boolean;
  isDeleted: boolean;
  isSelfSignUp: boolean; // Tu dang ky he thong, ko trung
  //   customer: Customer;
  //   appointments: Appointment[];
  //   merchantCustomers: MerchantCustomer[];
  //   vouchers: Voucher[];
  //   rates: Rate[];
  //   checkouts: Checkout[];
  //   merchantFavorites: MerchantFavorite[];
}
