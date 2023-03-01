import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  it(`Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.
  - A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;
  - Não deve existir o link de navegação para os detalhes do Pokémon selecionado.
  - A seção de detalhes deve conter um heading h2 com o texto Summary.
  - A seção de detalhes deve conter um parágrafo
  com o resumo do Pokémon específico sendo visualizado.`, () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const pokemonDetails = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pokemonDetails).toBeInTheDocument();

    expect(details).not.toBeInTheDocument();

    const heading = screen.getByRole('heading', { name: /summary/i });
    expect(heading).toBeInTheDocument();

    const paragraph = screen.getByText(/this intelligent pokémon roasts/i);
    expect(paragraph).toBeInTheDocument();
  });

  it(`Teste se existe na página uma seção com os mapas
  contendo as localizações do pokémon
  - Na seção de detalhes deverá existir um heading h2
  com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido.
  - Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;
  - Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização;
  - A imagem da localização deve ter um atributo src com a URL da localização;
  - A imagem da localização deve ter um atributo alt com o texto <name> location,
  onde <name> é o nome do Pokémon;
  `, () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const locations = screen.getByRole('heading', { name: /Game Locations of Pikachu/i });
    expect(locations).toBeInTheDocument();

    const image = screen.getAllByAltText(/pikachu location/i);
    const srcImg0 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const srcImg1 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';

    expect(image[0]).toHaveAttribute('src', srcImg0);
    expect(image[1]).toHaveAttribute('src', srcImg1);
    expect(image).toBeDefined();

    const location0 = screen.getByText(/Kanto Viridian Forest/i);
    expect(location0).toBeInTheDocument();

    const location1 = screen.getByText(/Kanto Power Plant/i);
    expect(location1).toBeInTheDocument();
  });

  it(`Teste se o usuário pode favoritar um pokémon
  através da página de detalhes.
  - A página deve exibir um checkbox que permite favoritar o Pokémon;
  - Cliques alternados no checkbox devem adicionar e
  remover respectivamente o Pokémon da lista de favoritos;
  - O label do checkbox deve conter o texto Pokémon favoritado?;`, () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const checkBox = screen.getByRole('checkbox', { checked: false });
    userEvent.click(checkBox);

    const label = screen.getByLabelText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();
  });
});
