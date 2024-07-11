import Greeting  from './Greeting'; 

describe('<Greeting />', () => {

    context('Rendering', () => {
        it('renders correctly without a name', () => {
            cy.mount(<Greeting />);
            cy.contains('Hi').should('contain.text', 'there');
        });

        it('renders correctly with a name', () => {
            cy.mount(<Greeting name="John" />);
            cy.contains('Hi').should('contain.text', 'John');
        });
    });

    context('Date Display', () => {
        it('displays the current date', () => {
            const currentDate = new Date().toDateString();
            cy.mount(<Greeting />);
            cy.contains('It is now').should('contain.text', currentDate);
        });
    });

});
