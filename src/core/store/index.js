import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux';
import rootSaga from '../saga';
import authReducer from '../reducer/authReducer';
import chatReducer from '../reducer/chatReducer';
import userReducer from '../reducer/userReducer';
import socketReducer from '../reducer/socketReducer';
import themeReducer from '../reducer/themeReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authReducer','themeReducer' ], 
};

const rootReducer = combineReducers({
    themeReducer,
    authReducer,
    socketReducer,
    chatReducer,
    userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    persistedReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
