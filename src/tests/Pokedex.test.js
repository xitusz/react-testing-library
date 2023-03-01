import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  it(`Teste se é exibido o próximo Pokémon da lista
  quando o botão Próximo pokémon é clicado.
  O botão deve conter o texto Próximo pokémon
  Os próximos Pokémons da lista devem ser mostrados,
  um a um, ao clicar sucessivamente no botão;
  O primeiro Pokémon da lista deve ser mostrado ao clicar no botão,
  se estiver no último Pokémon da lista;`, () => {
    renderWithRouter(<App />);
    const nextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemon).toBeInTheDocument();

    userEvent.click(nextPokemon);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();

    userEvent.click(nextPokemon);
    expect(screen.getByText(/caterpie/i)).toBeInTheDocument();

    userEvent.click(nextPokemon);
    expect(screen.getByText(/ekans/i)).toBeInTheDocument();

    userEvent.click(nextPokemon);
    expect(screen.getByText(/alakazam/i)).toBeInTheDocument();

    userEvent.click(nextPokemon);
    expect(screen.getByText(/mew/i)).toBeInTheDocument();

    userEvent.click(nextPokemon);
    expect(screen.getByText(/rapidash/i)).toBeInTheDocument();

    userEvent.click(nextPokemon);
    expect(screen.getByText(/snorlax/i)).toBeInTheDocument();

    userEvent.click(nextPokemon);
    expect(screen.getByText(/dragonair/i)).toBeInTheDocument();

    userEvent.click(nextPokemon);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const pokemon1 = screen.getByText(/pikachu/i);
    const pokemon2 = screen.queryByText(/charmander/i);

    expect(pokemon1).toBeInTheDocument();
    expect(pokemon2).not.toBeInTheDocument();
  });

  it(`Teste se a Pokédex tem os botões de filtro.
  Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
  - A partir da seleção de um botão de tipo,
  a Pokédex deve circular somente pelos pokémons daquele tipo;
  - O texto do botão deve corresponder ao nome do tipo, ex. Psychic;
  - O botão All precisa estar sempre visível.`, () => {
    renderWithRouter(<App />);
    // Reference: https://github.com/tryber/sd-016-a-project-react-testing-library/pull/1/commits/1035368ab21e788037d9cdd8ebc370b5ecad3693 me fez perceber que existia o 'data-testid' nos componentes (ainda não tinha olhado os componentes)
    const pokemonType = screen.getAllByTestId('pokemon-type-button');
    expect(pokemonType[0]).toHaveTextContent(/electric/i);
    expect(pokemonType[1]).toHaveTextContent(/fire/i);
    expect(pokemonType[2]).toHaveTextContent(/bug/i);
    expect(pokemonType[3]).toHaveTextContent(/poison/i);
    expect(pokemonType[4]).toHaveTextContent(/psychic/i);
    expect(pokemonType[5]).toHaveTextContent(/normal/i);
    expect(pokemonType[6]).toHaveTextContent(/dragon/i);

    userEvent.click(pokemonType[0]);
    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent(/electric/i);

    const button = screen.getByRole('button', { name: 'All' });
    expect(button).toBeInTheDocument();

    userEvent.click(button);
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  });
});
