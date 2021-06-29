interface IUserStore {
  locationID: string;
  favorites: string[];
  metric: boolean;
  darkTheme: boolean;
}

type UserAction = {
  type: string;
  newLocationID: string;
  newFavorites: any[];
  metric: boolean;
  darkTheme: boolean;
};

interface IDarkTheme {
  darkTheme: boolean;
}

type DispatchType = (args: UserAction) => UserAction;
