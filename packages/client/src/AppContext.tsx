import React, { createContext, useState } from 'react';

export interface AppContextProps {
  place: google.maps.places.PlaceResult | null;
  setPlace: (place: google.maps.places.PlaceResult | null) => void;
}

export const AppContext = createContext<AppContextProps>({
  place: null,
  setPlace: () => {},
});

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
    null
  );

  return (
    <AppContext.Provider value={{ place, setPlace }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
