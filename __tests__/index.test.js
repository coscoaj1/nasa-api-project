import { render, screen, fireEvent } from '@testing-library/react';
import Home, { nasaUrl } from '../pages/index';
import Header from '../components/Header';
import GalleryButton from '../components/GalleryButton';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import LikeButton from '../components/LikeButton';

describe('Home', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test('renders a heading', () => {
		render(<Home />);

		const heading = screen.getByRole('heading', {
			name: /My SpaceBook/i,
		});

		expect(heading).toBeInTheDocument();
	});

	test('clicking the dark theme button calls the event handler once', () => {
		const mockHandler = jest.fn();

		const component = render(<Header toggleTheme={mockHandler} />);

		const button = component.getByTestId('theme-toggle');
		fireEvent.click(button);

		expect(mockHandler.mock.calls).toHaveLength(1);
	});
});

// API testing

const imageResponse = rest.get(
	`${nasaUrl}2022-01-09&api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`,
	(req, res, ctx) => {
		return res(
			ctx.json({
				imageDate: '2022-01-09',
				explanation: "What will become of Jupiter's Great Red Spot?",
				title: "Hubble's Jupiter and the Shrinking Great Red Spot",
				url: 'https://apod.nasa.gov/apod/image/2201/JupiterOpal_HubbleMasztalerz_960.jpg',
			})
		);
	}
);

describe('API Call', () => {
	const server = setupServer(imageResponse);

	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	test('it should have the correct title', async () => {
		render(<Home />);
		const imageTitle = await screen.findByText(
			"Hubble's Jupiter and the Shrinking Great Red Spot"
		);

		expect(imageTitle).toBeVisible();
	});

	test('it should have the correct description', async () => {
		render(<Home />);
		const imageDescription = await screen.findByText(
			"What will become of Jupiter's Great Red Spot?"
		);

		expect(imageDescription).toBeVisible();
	});
});

describe('Other Buttons', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test('clicking the next button calls the event handler once', () => {
		const mockHandler = jest.fn();
		const component = render(<GalleryButton changeDate={mockHandler} />);

		const button = component.getByTestId('decrement-button');
		fireEvent.click(button);

		expect(mockHandler.mock.calls).toHaveLength(1);
	});
	test('clicking the like button calls the event handler once', () => {
		const mockHandler = jest.fn();

		const component = render(<LikeButton setLikeImage={mockHandler} />);

		const button = component.getByTestId('like-button');
		fireEvent.click(button);

		expect(mockHandler.mock.calls).toHaveLength(1);
	});
});
