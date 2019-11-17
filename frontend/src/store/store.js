import { createStore } from 'redux';
import reducers from './reducers/reducers';



export default function configureStore() {

    const store = createStore(
        reducers,

    );

    // add a listener that will be invoked on any state change

    // Update the initial theme

    return store;

}