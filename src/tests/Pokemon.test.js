import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  it(`Teste se é renderizado um card com as informações de determinado pokémon.
  - O nome correto do Pokémon deve ser mostrado na tela;
  - O tipo correto do pokémon deve ser mostrado na tela.
  - O peso médio do pokémon deve ser exibido com um texto
  no formato Average weight: <value> <measurementUnit>;
  onde <value> e <measurementUnit> são, respectivamente,
  o peso médio do pokémon e sua unidade de medida.
  - A imagem do Pokémon deve ser exibida.
  Ela deve conter um atributo src com a URL da imagem e um atributo alt
  com o texto <name> sprite, onde <name> é o nome do pokémon;`, () => {
    renderWithRouter(<App />);

    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent(/pikachu/i);

    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent(/electric/i);

    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent(/average weight: 6.0 kg/i);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'Pikachu sprite');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it(`Teste se o card do Pokémon indicado na Pokédex contém um link de navegação
  para exibir detalhes deste Pokémon.
  O link deve possuir a URL /pokemons/<id>,
  onde <id> é o id do Pokémon exibido;`, () => {
    renderWithRouter(<App />);
    // Reference: https://stackoverflow.com/questions/57827126/how-to-test-anchors-href-with-react-testing-library
    const details = screen.getByRole('link', { name: /more details/i });
    expect(details).toHaveAttribute('href', '/pokemons/25');
  });

  it(`Teste se ao clicar no link de navegação do Pokémon,
  é feito o redirecionamento da aplicação
  para a página de detalhes de Pokémon.`, () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const pokemonDetails = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pokemonDetails).toBeInTheDocument();
  });

  it(`Teste também se a URL exibida no navegador muda para /pokemon/<id>,
  onde <id> é o id do Pokémon cujos detalhes se deseja ver;`, () => {
    const { history } = renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it(`Teste se existe um ícone de estrela nos Pokémons favoritados.
  - O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg;
  - A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite,
  onde <pokemon> é o nome do Pokémon exibido.`, () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const checkBox = screen.getByRole('checkbox', { checked: false });
    userEvent.click(checkBox);

    const image = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(image).toHaveAttribute('src', '/star-icon.svg');
    expect(image).toBeInTheDocument();
  });
});
