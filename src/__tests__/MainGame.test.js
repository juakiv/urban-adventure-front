import { render, screen } from '@testing-library/react';
import MainGame from '../MainGame';
import { shallow } from 'enzyme';

describe("it renders correct content", () => {
    
    test("it renders", () => {
        render(<MainGame/>);
        const wrappingDiv = screen.getByTestId("main-game");
        expect(wrappingDiv).toBeInTheDocument();   
    });

    test("it renders correct part when game is not running", () => {
        render(<MainGame/>);
        const ui = screen.getByTestId("ui");
        expect(ui).toBeInTheDocument();
    });

    test("it renders correct part when game is running", () => {
        const mainGameWrapper = shallow( <MainGame/>);
        console.log(mainGameWrapper.debug());
    });
});