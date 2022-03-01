import { useState } from 'react';
import '../App.css';

function App() {
  const MAP_DIMENSIONS = [10, 10]; // [row, column]
  const current_map = initializeMap(MAP_DIMENSIONS);
  const [player_position_x, setPlayerPositionX] = useState(0);
  const [player_position_y, setPlayerPositionY] = useState(0);
  const [player_direction, setPlayerDirection] = useState(0); // 0 = right, 1 = down, 2 = left and 3 = up
  const DIRECTION_ASSOCIATION = {
    0: '👉',
    1: '👇',
    2: '👈',
    3: '☝️',
  }

  function initializeMap(map_dimensions) {
    let map_matrix = [];
    for (let column = 0; column < map_dimensions[0]; column++) {
      let row_array = [];
      for (let row = 0; row < map_dimensions[1]; row++) {
        row_array.push(-1);
      }
      map_matrix.push(row_array);
    }

    map_matrix[2][2] = 4; // add block
    map_matrix[4][4] = 4;
    map_matrix[6][6] = 4;

    return map_matrix;
  }

  function movePlayer() {
    switch (player_direction) {
      case 0:
        if (player_position_x + 1 < MAP_DIMENSIONS[1] && current_map[player_position_x + 1][player_position_y] !== 4) {
          setPlayerPositionX(previousPlayerPositionX => player_position_x + 1);
        }
        break;
      case 1:
        if (player_position_y + 1 < MAP_DIMENSIONS[0] && current_map[player_position_x][player_position_y + 1] !== 4) {
          setPlayerPositionY(previousPlayerPositionY => player_position_y + 1);
        }
        break;
      case 2:
        if (player_position_x - 1 >= 0 && current_map[player_position_x - 1][player_position_y] !== 4) {
          setPlayerPositionX(previousPlayerPositionX => player_position_x - 1);
        }
        break;
      case 3:
        if (player_position_y - 1 >= 0 && current_map[player_position_x][player_position_y - 1] !== 4) {
          setPlayerPositionY(previousPlayerPositionY => player_position_y - 1);
        }
        break;
      default:
    }
  }

  function changePlayerDirection() {
    setPlayerDirection(previousPlayerDirection => (player_direction + 1) % 4);
  }

  return (
    <div className="App">
        <button onClick={movePlayer}>move</button>
        <button onClick={changePlayerDirection}>change direction</button>
        <table className="table" data-testid="table" current-player-position-x={player_position_x} current-player-position-y={player_position_y}>
          <tbody>
            {current_map.map((map_row, column_index) => 
              <tr key={'column-' + column_index}>
                {map_row.map((map_row_element, row_index) => 
                  <td key={'row-' + row_index}>
                    {(column_index === player_position_y && row_index === player_position_x) ? DIRECTION_ASSOCIATION[player_direction] : (map_row_element === 4 ? '❌' : '')}
                  </td>
                )}
              </tr>
            )}
          </tbody>
        </table>
    </div>
  );
}

export default App;
