from menu_item import MenuItem
from menu_manager import MenuManager


def show_user_menu():
    """Display the program menu and handle user input"""
    while True:
        print("\n" + "="*50)
        print("RESTAURANT MENU MANAGER")
        print("="*50)
        print("V - View an Item")
        print("A - Add an Item")
        print("D - Delete an Item")
        print("U - Update an Item")
        print("S - Show the Menu")
        print("E - Exit")
        print("="*50)
        
        choice = input("Enter your choice: ").upper().strip()
        
        if choice == 'V':
            view_item()
        elif choice == 'A':
            add_item_to_menu()
        elif choice == 'D':
            remove_item_from_menu()
        elif choice == 'U':
            update_item_from_menu()
        elif choice == 'S':
            show_restaurant_menu()
        elif choice == 'E':
            print("\nFinal Restaurant Menu:")
            show_restaurant_menu()
            print("\nThank you for using Restaurant Menu Manager!")
            break
        else:
            print("Invalid choice. Please try again.")


def add_item_to_menu():
    """Add a new item to the menu"""
    print("\n--- ADD NEW ITEM ---")
    
    try:
        name = input("Enter item name: ").strip()
        if not name:
            print("Item name cannot be empty.")
            return
        
        price = int(input("Enter item price: "))
        if price < 0:
            print("Price cannot be negative.")
            return
        
        # Create MenuItem object and save it
        item = MenuItem(name, price)
        if item.save():
            print(f"'{name}' was added successfully!")
        else:
            print("Error: Failed to add item.")
            
    except ValueError:
        print("Error: Please enter a valid price (number).")
    except Exception as e:
        print(f"Error: {e}")


def remove_item_from_menu():
    """Remove an item from the menu"""
    print("\n--- DELETE ITEM ---")
    
    name = input("Enter the name of the item to delete: ").strip()
    if not name:
        print("Item name cannot be empty.")
        return
    
    # Check if item exists
    existing_item = MenuManager.get_by_name(name)
    if not existing_item:
        print(f"Error: Item '{name}' not found in the menu.")
        return
    
    # Create MenuItem object and delete it
    item = MenuItem(name, existing_item.price)
    if item.delete():
        print(f"'{name}' was deleted successfully!")
    else:
        print("Error: Failed to delete item.")


def update_item_from_menu():
    """Update an existing item in the menu"""
    print("\n--- UPDATE ITEM ---")
    
    current_name = input("Enter the current name of the item to update: ").strip()
    if not current_name:
        print("Item name cannot be empty.")
        return
    
    # Check if item exists
    existing_item = MenuManager.get_by_name(current_name)
    if not existing_item:
        print(f"Error: Item '{current_name}' not found in the menu.")
        return
    
    print(f"Current item: {existing_item.name} - ${existing_item.price}")
    
    try:
        new_name = input("Enter new name (or press Enter to keep current): ").strip()
        if not new_name:
            new_name = None
        
        new_price_input = input("Enter new price (or press Enter to keep current): ").strip()
        new_price = None
        if new_price_input:
            new_price = int(new_price_input)
            if new_price < 0:
                print("Price cannot be negative.")
                return
        
        # Create MenuItem object and update it
        item = MenuItem(current_name, existing_item.price)
        if item.update(new_name, new_price):
            print(f"Item was updated successfully!")
        else:
            print("Error: Failed to update item.")
            
    except ValueError:
        print("Error: Please enter a valid price (number).")
    except Exception as e:
        print(f"Error: {e}")


def view_item():
    """View a specific item from the menu"""
    print("\n--- VIEW ITEM ---")
    
    name = input("Enter the name of the item to view: ").strip()
    if not name:
        print("Item name cannot be empty.")
        return
    
    item = MenuManager.get_by_name(name)
    if item:
        print(f"\nItem found:")
        print(f"Name: {item.name}")
        print(f"Price: ${item.price}")
        print(f"ID: {item.item_id}")
    else:
        print(f"Item '{name}' not found in the menu.")


def show_restaurant_menu():
    """Display the entire restaurant menu"""
    print("\n--- RESTAURANT MENU ---")
    
    items = MenuManager.all_items()
    
    if not items:
        print("The menu is empty.")
        return
    
    print(f"{'ID':<5} {'Item Name':<20} {'Price':<10}")
    print("-" * 40)
    
    for item in items:
        print(f"{item.item_id:<5} {item.name:<20} ${item.price:<9}")


if __name__ == "__main__":
    show_user_menu()
