import { Homepage } from './homepage';
import { Tester } from './tester';

export const CurrentView = () => {
    let view = 0;

    const buttonClick = button => {
        view = button.value;
    };

    switch(view) {
        case 1:
            return <>
                <h1>UH OH!!!</h1>
            </>;
        case 2:
            return <>
            <Homepage />
            </>;
        default:
            return <>
            <Tester />
            </>;
    }
};
