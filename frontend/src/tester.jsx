import { CurrentView } from './currentView';
import { Homepage } from './homepage';

export const Tester = () => {
    return <>
        <button value={1} onClick={CurrentView.buttonClick}>Button 1</button>
        <button value={2}>Button 2</button>
    </>;
};
