interface Reviews {
  id: string;
  comment: string;
  rating: string;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
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
