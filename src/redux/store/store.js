import { createStore, applyMiddleware  } from "redux";
import { persistStore, persistReducer } from 'redux-persist';

import rootReducer from "../reducer/rootReducer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


import thunk from "redux-thunk"
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2, // Xem thêm tại mục "Quá trình merge".,
    blacklist: []
};

const presistedReducer = persistReducer(persistConfig, rootReducer );

const middleware = [thunk];

export const store = createStore(presistedReducer, applyMiddleware(...middleware))
export const persistor = persistStore(store);
