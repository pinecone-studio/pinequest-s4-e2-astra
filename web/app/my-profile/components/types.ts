export interface ProfileData {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  profileImage: string | null;
}

export interface ProfileFormState {
  name: string;
  phone: string;
}
