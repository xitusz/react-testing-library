import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('1. Teste o componente <App.js />', () => {
  it(`Teste se o topo da aplicação contém um conjunto fixo de links de navegação.
    - O primeiro link deve possuir o texto Home.
    - O segundo link deve possuir o texto About.
    - O terceiro link deve possuir o texto Favorite Pokémons.`, () => {
    renderWithRouter(<App />);
    const element1 = screen.getByRole('link', { name: /home/i });
    expect(element1).toBeInTheDocument();

    const element2 = screen.getByRole('link', { name: /about/i });
    expect(element2).toBeInTheDocument();

    const element3 = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(element3).toBeInTheDocument();
  });

  it(`Teste se a aplicação é redirecionada para a página inicial,
    na URL / ao clicar no link Home da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it(`Teste se a aplicação é redirecionada para a página de About,
    na URL /about, ao clicar no link About da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados,
    na URL /favorites,
    ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it(`Teste se a aplicação é redirecionada
    para a página Not Found ao entrar em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);

    history.push('/wasdwasd');
    const notFound = screen.getByText(/page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
