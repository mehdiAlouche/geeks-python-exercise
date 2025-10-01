import psycopg2
from config import DB_CONFIG


class MenuItem:
    def __init__(self, name, price):
        self.name = name
        self.price = price
        self.item_id = None

    def save(self):
        """Save the menu item to the database"""
        try:
            connection = psycopg2.connect(**DB_CONFIG)
            cursor = connection.cursor()
            
            # Insert the item into the database
            cursor.execute(
                "INSERT INTO Menu_Items (item_name, item_price) VALUES (%s, %s) RETURNING item_id",
                (self.name, self.price)
            )
            
            # Get the generated item_id
            self.item_id = cursor.fetchone()[0]
            
            connection.commit()
            cursor.close()
            connection.close()
            
            return True
        except psycopg2.Error as e:
            print(f"Error saving item: {e}")
            return False

    def delete(self):
        """Delete the menu item from the database"""
        try:
            connection = psycopg2.connect(**DB_CONFIG)
            cursor = connection.cursor()
            
            # Delete the item from the database
            cursor.execute(
                "DELETE FROM Menu_Items WHERE item_name = %s",
                (self.name,)
            )
            
            rows_affected = cursor.rowcount
            connection.commit()
            cursor.close()
            connection.close()
            
            return rows_affected > 0
        except psycopg2.Error as e:
            print(f"Error deleting item: {e}")
            return False

    def update(self, new_name=None, new_price=None):
        """Update the menu item in the database"""
        try:
            connection = psycopg2.connect(**DB_CONFIG)
            cursor = connection.cursor()
            
            # Build the update query dynamically based on what's being updated
            update_fields = []
            update_values = []
            
            if new_name is not None:
                update_fields.append("item_name = %s")
                update_values.append(new_name)
            
            if new_price is not None:
                update_fields.append("item_price = %s")
                update_values.append(new_price)
            
            if not update_fields:
                return False
            
            # Add the original name for the WHERE clause
            update_values.append(self.name)
            
            query = f"UPDATE Menu_Items SET {', '.join(update_fields)} WHERE item_name = %s"
            cursor.execute(query, update_values)
            
            rows_affected = cursor.rowcount
            connection.commit()
            cursor.close()
            connection.close()
            
            # Update the object attributes if the update was successful
            if rows_affected > 0:
                if new_name is not None:
                    self.name = new_name
                if new_price is not None:
                    self.price = new_price
            
            return rows_affected > 0
        except psycopg2.Error as e:
            print(f"Error updating item: {e}")
            return False

    def __str__(self):
        return f"MenuItem(name='{self.name}', price={self.price}, id={self.item_id})"

    def __repr__(self):
        return self.__str__()
