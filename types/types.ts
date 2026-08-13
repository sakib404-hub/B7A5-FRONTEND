export interface Reviews {
  id: string;
  comment: string;
  rating: string;
}

//? user interfaces

//? ROLE
export enum UserRole  {
  ADMIN = 'ADMIN',
  PROVIDER = 'PROVIDER',
  CUSTOMER = 'CUSTOMER'
}

//? USER STATUS
export enum UserStatus  {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED'
}

//? USER
export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  reviews: Reviews[];
}


export interface NavbarProps {
  user?: IUser | null;
}

export interface LoginState {
    success : boolean;
    statusCode : number;
    message : string;
    data : {
        accessToken : string;
        refreshToken : string;
    }
}

export interface RegisterState {
    success : boolean;
    statusCode : number;
    message : string;
    data : {
        name : string;
        email : string;
        password : string;
        role : string;
    }
}

export interface ICategory {
  id : string;
  name : string;
  description : string;
  createdAt : string;
}

interface Provider {
  id: string;
  name: string;
  email: string;
}

interface Review {
  id?: string;
  rating?: number;
}

export enum GearStatus {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE'
}

export interface Gear {
  id: string;
  title: string;
  description: string;
  pricePerDay: number;
  brand: string;
  stockQuantity: number;
  status: GearStatus;
  providerId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  provider: Provider;
  reviews: Review[];
}

export interface GearCardProps {
  gear: Gear;
}
export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface CategoryCardProps {
  category: Category;
}


export interface SidebarProps {
  role: UserRole;
}

export interface SidebarItemConfig {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface SidebarContentProps {
  role: UserRole;
  handleLogout: () => void;
  isPending: boolean;
  closeMobile: () => void;
}

