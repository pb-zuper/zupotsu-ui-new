// AppContext.js
import {
  createContext,
  useState,
} from 'react';

interface ContextProps {
  globalState: {
    unsavedForm: boolean;
    wantsToLeave: boolean;
    formSubmitted: boolean;
  }; // Change the type according to your global state type
  /**
   * Set the unsaved changes flag so other components will let it know
   * @param {boolean} unsavedForm 
   * @returns 
   */
  onFormChanges: (unsavedForm?: boolean) => void; // Change the type according to your global state type
  onWantToLeave: Function;
  onFormSubmitted: Function;
  resetWantToLeave: Function;
}

const GlobalContext = createContext<ContextProps | undefined>(undefined);

// Global content provider add any other values which required throughout application
const GlobalContextProvider = ({ children }: any) => {
  const [globalState, setGlobalState] = useState({
    unsavedForm: false,
    wantsToLeave: false,
    formSubmitted: false
  });

  const onFormChanges = (unsavedForm = true) => {
    setGlobalState((prev) => ({
      ...prev,
      unsavedForm
    }));
  };

  const onWantToLeave = () => {
    if (globalState.unsavedForm) {
      setGlobalState((prev) => ({
        ...prev,
        wantsToLeave: true,
      }));

      return false;
    }
    return true;
  };

  const resetWantToLeave = () => {
    setGlobalState((prev) => ({
      ...prev,
      wantsToLeave: false,
    }));

  }

  const onFormSubmitted = () => {
    if(globalState.wantsToLeave) {
      setGlobalState((prev) => ({
        ...prev,
        formSubmitted: true,
        unsavedForm: false
      }));
    }
 
  }

  return (
    <GlobalContext.Provider
      value={{ globalState, onFormChanges, onWantToLeave, onFormSubmitted, resetWantToLeave }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };
