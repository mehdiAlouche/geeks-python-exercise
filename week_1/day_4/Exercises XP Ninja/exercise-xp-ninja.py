import copy
import time
import os

class Cell:
    
    def __init__(self, alive=False):
        self.alive = alive
        self.next_state = alive
    
    def __str__(self):
        return "■" if self.alive else "□"
    
    def __repr__(self):
        return f"Cell({self.alive})"
    
    def is_alive(self):
        return self.alive
    
    def set_alive(self, alive):
        self.alive = alive
    
    def prepare_next_state(self, alive):
        self.next_state = alive
    
    def update(self):
        self.alive = self.next_state


class GameOfLife:
    
    def __init__(self, width=20, height=20, expandable=False, max_size=10000):
        self.width = width
        self.height = height
        self.expandable = expandable
        self.max_size = max_size
        self.generation = 0
        
        self.grid = [[Cell(False) for _ in range(self.width)] for _ in range(self.height)]
        
        self.min_x = 0
        self.max_x = self.width - 1
        self.min_y = 0
        self.max_y = self.height - 1
    
    def clear_screen(self):
        os.system('cls' if os.name == 'nt' else 'clear')
    
    def display_grid(self):
        print(f"Generation: {self.generation}")
        print("=" * (self.width * 2 + 2))
        
        for row in self.grid:
            print("|" + "".join(str(cell) for cell in row) + "|")
        
        print("=" * (self.width * 2 + 2))
        print()
    
    def get_neighbors(self, x, y):
        count = 0
        for dx in [-1, 0, 1]:
            for dy in [-1, 0, 1]:
                if dx == 0 and dy == 0:
                    continue
                
                nx, ny = x + dx, y + dy
                
                if 0 <= nx < self.width and 0 <= ny < self.height:
                    if self.grid[ny][nx].is_alive():
                        count += 1
        
        return count
    
    def expand_grid_if_needed(self, x, y):
        if not self.expandable:
            return False
        
        expanded = False
        
        if x < 0 and self.min_x > -self.max_size:
            self.expand_left()
            expanded = True
        
        if x >= self.width and self.max_x < self.max_size:
            self.expand_right()
            expanded = True
        
        if y < 0 and self.min_y > -self.max_size:
            self.expand_up()
            expanded = True
        
        if y >= self.height and self.max_y < self.max_size:
            self.expand_down()
            expanded = True
        
        return expanded
    
    def expand_left(self):
        for row in self.grid:
            row.insert(0, Cell(False))
        self.width += 1
        self.min_x -= 1
    
    def expand_right(self):
        for row in self.grid:
            row.append(Cell(False))
        self.width += 1
        self.max_x += 1
    
    def expand_up(self):
        new_row = [Cell(False) for _ in range(self.width)]
        self.grid.insert(0, new_row)
        self.height += 1
        self.min_y -= 1
    
    def expand_down(self):
        new_row = [Cell(False) for _ in range(self.width)]
        self.grid.append(new_row)
        self.height += 1
        self.max_y += 1
    
    def set_cell(self, x, y, alive):
        if self.expandable:
            self.expand_grid_if_needed(x, y)
            if x < 0:
                x = 0
            if y < 0:
                y = 0
            if x >= self.width:
                x = self.width - 1
            if y >= self.height:
                y = self.height - 1
        
        if 0 <= x < self.width and 0 <= y < self.height:
            self.grid[y][x].set_alive(alive)
    
    def get_cell(self, x, y):
        if 0 <= x < self.width and 0 <= y < self.height:
            return self.grid[y][x]
        return Cell(False)
    
    def apply_rules(self):
        for y in range(self.height):
            for x in range(self.width):
                neighbors = self.get_neighbors(x, y)
                cell = self.grid[y][x]
                
                if cell.is_alive():
                    if neighbors < 2 or neighbors > 3:
                        cell.prepare_next_state(False)
                    else:
                        cell.prepare_next_state(True)
                else:
                    if neighbors == 3:
                        cell.prepare_next_state(True)
                    else:
                        cell.prepare_next_state(False)
        
        for y in range(self.height):
            for x in range(self.width):
                self.grid[y][x].update()
        
        self.generation += 1
    
    def count_alive_cells(self):
        count = 0
        for row in self.grid:
            for cell in row:
                if cell.is_alive():
                    count += 1
        return count
    
    def is_stable(self, previous_grid):
        if len(previous_grid) != len(self.grid):
            return False
        
        for y in range(len(self.grid)):
            if len(previous_grid[y]) != len(self.grid[y]):
                return False
            for x in range(len(self.grid[y])):
                if previous_grid[y][x].is_alive() != self.grid[y][x].is_alive():
                    return False
        return True
    
    def run_simulation(self, max_generations=100, delay=0.5, auto_stop=True):
        print("Starting Game of Life simulation...")
        print("Press Ctrl+C to stop the simulation")
        print()
        
        try:
            previous_grid = None
            stable_count = 0
            
            for gen in range(max_generations):
                self.clear_screen()
                self.display_grid()
                
                alive_count = self.count_alive_cells()
                print(f"Alive cells: {alive_count}")
                
                if alive_count == 0:
                    print("All cells have died. Simulation ended.")
                    break
                
                if auto_stop and previous_grid is not None:
                    if self.is_stable(previous_grid):
                        stable_count += 1
                        if stable_count >= 3:
                            print("Pattern has stabilized. Simulation ended.")
                            break
                    else:
                        stable_count = 0
                
                previous_grid = copy.deepcopy(self.grid)
                
                self.apply_rules()
                
                time.sleep(delay)
                
        except KeyboardInterrupt:
            print("\nSimulation stopped by user.")
    
    def load_pattern(self, pattern_name):
        patterns = {
            'glider': [
                (1, 0), (2, 1), (0, 2), (1, 2), (2, 2)
            ],
            'blinker': [
                (1, 1), (1, 2), (1, 3)
            ],
            'toad': [
                (2, 2), (3, 2), (4, 2), (1, 3), (2, 3), (3, 3)
            ],
            'beacon': [
                (1, 1), (2, 1), (1, 2), (4, 3), (3, 4), (4, 4)
            ],
            'pulsar': [
                (2, 0), (3, 0), (4, 0), (8, 0), (9, 0), (10, 0),
                (0, 2), (5, 2), (7, 2), (12, 2),
                (0, 3), (5, 3), (7, 3), (12, 3),
                (0, 4), (5, 4), (7, 4), (12, 4),
                (2, 5), (3, 5), (4, 5), (8, 5), (9, 5), (10, 5),
                (2, 7), (3, 7), (4, 7), (8, 7), (9, 7), (10, 7),
                (0, 8), (5, 8), (7, 8), (12, 8),
                (0, 9), (5, 9), (7, 9), (12, 9),
                (0, 10), (5, 10), (7, 10), (12, 10),
                (2, 12), (3, 12), (4, 12), (8, 12), (9, 12), (10, 12)
            ],
            'gosper_glider_gun': [
                (24, 0), (22, 1), (24, 1), (12, 2), (13, 2), (20, 2), (21, 2), (34, 2), (35, 2),
                (11, 3), (15, 3), (20, 3), (21, 3), (34, 3), (35, 3),
                (0, 4), (1, 4), (10, 4), (16, 4), (20, 4), (21, 4),
                (0, 5), (1, 5), (10, 5), (14, 5), (16, 5), (17, 5), (22, 5), (24, 5),
                (10, 6), (16, 6), (24, 6),
                (11, 7), (15, 7),
                (12, 8), (13, 8)
            ]
        }
        
        if pattern_name in patterns:
            for y in range(self.height):
                for x in range(self.width):
                    self.grid[y][x].set_alive(False)
            
            for x, y in patterns[pattern_name]:
                self.set_cell(x, y, True)
            
            print(f"Loaded pattern: {pattern_name}")
        else:
            print(f"Pattern '{pattern_name}' not found.")
            print("Available patterns:", list(patterns.keys()))


def main():
    print("Conway's Game of Life")
    print("=" * 50)
    
    game = GameOfLife(width=40, height=20, expandable=True)
    
    print("Available patterns:")
    print("1. Glider")
    print("2. Blinker")
    print("3. Toad")
    print("4. Beacon")
    print("5. Pulsar")
    print("6. Gosper Glider Gun")
    print("7. Custom (manual input)")
    
    try:
        choice = input("\nSelect a pattern (1-7): ").strip()
        
        if choice == '1':
            game.load_pattern('glider')
        elif choice == '2':
            game.load_pattern('blinker')
        elif choice == '3':
            game.load_pattern('toad')
        elif choice == '4':
            game.load_pattern('beacon')
        elif choice == '5':
            game.load_pattern('pulsar')
        elif choice == '6':
            game.load_pattern('gosper_glider_gun')
        elif choice == '7':
            print("Manual pattern input not implemented in this demo.")
            print("Loading glider pattern instead...")
            game.load_pattern('glider')
        else:
            print("Invalid choice. Loading glider pattern...")
            game.load_pattern('glider')
        
        game.run_simulation(max_generations=200, delay=0.3)
        
    except KeyboardInterrupt:
        print("\nProgram terminated by user.")
    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    main()
