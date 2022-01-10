import { cy } from 'date-fns/locale';
import { context } from 'msw';

describe('Home Page', () => {
	it('should find our home page', () => {
		cy.visit('http://localhost:3000');
		cy.get('h1').contains('My SpaceBook');
	});
});
