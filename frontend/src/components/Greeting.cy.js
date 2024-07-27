import Greeting  from './Greeting'; 

describe('<Greeting />', () => {
    context('Rendering', () => {
        it('renders correctly without a name', () => {
            cy.mount(<Greeting />);
            cy.contains('Hi there').should('be.visible');
        });

        it('renders correctly with a name', () => {
            cy.mount(<Greeting name="John" />);
            cy.contains('Hi John').should('be.visible');
        });
    });

    context('Date Display', () => {
        it('displays the current date', () => {
            const currentDate = new Date().toDateString();
            cy.mount(<Greeting />);
            cy.contains(`It is now ${currentDate}`).should('be.visible');
        });
    });
});