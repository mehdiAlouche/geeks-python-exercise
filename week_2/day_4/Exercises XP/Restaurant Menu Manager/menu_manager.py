import psycopg2
from config import DB_CONFIG
from menu_item import MenuItem


class MenuManager:
    @classmethod
    def get_by_name(cls, name):
        """Return a single MenuItem from the database by name, or None if not found"""
        try:
            connection = psycopg2.connect(**DB_CONFIG)
            cursor = connection.cursor()
            
            cursor.execute(
                "SELECT item_id, item_name, item_price FROM Menu_Items WHERE item_name = %s",
                (name,)
            )
            
            result = cursor.fetchone()
            cursor.close()
            connection.close()
            
            if result:
                item_id, item_name, item_price = result
                menu_item = MenuItem(item_name, item_price)
                menu_item.item_id = item_id
                return menu_item
            else:
                return None
                
        except psycopg2.Error as e:
            print(f"Error getting item by name: {e}")
            return None

    @classmethod
    def all_items(cls):
        """Return a list of all MenuItems from the database"""
        try:
            connection = psycopg2.connect(**DB_CONFIG)
            cursor = connection.cursor()
            
            cursor.execute(
                "SELECT item_id, item_name, item_price FROM Menu_Items ORDER BY item_name"
            )
            
            results = cursor.fetchall()
            cursor.close()
            connection.close()
            
            menu_items = []
            for result in results:
                item_id, item_name, item_price = result
                menu_item = MenuItem(item_name, item_price)
                menu_item.item_id = item_id
                menu_items.append(menu_item)
            
            return menu_items
            
        except psycopg2.Error as e:
            print(f"Error getting all items: {e}")
            return []

    @classmethod
    def all(cls):
        """Alias for all_items method to match the example usage"""
        return cls.all_items()
