import math

class Pagination:
    def __init__(self, items=None, page_size=5):
        if items is None:
            items = []
        self.items = items
        self.page_size = page_size
        self.current_idx = 0
        self.total_pages = math.ceil(len(self.items) / self.page_size)

    # Step 3 – Get current page items
    def get_visible_items(self):
        start = self.current_idx * self.page_size
        end = start + self.page_size
        return self.items[start:end]

    # Step 4 – Navigation methods
    def go_to_page(self, page):
        if page < 1 or page > self.total_pages:
            raise ValueError("Page out of range")
        self.current_idx = page - 1
        return self

    def first_page(self):
        self.current_idx = 0
        return self

    def last_page(self):
        self.current_idx = self.total_pages - 1
        return self

    def next_page(self):
        if self.current_idx < self.total_pages - 1:
            self.current_idx += 1
        return self

    def previous_page(self):
        if self.current_idx > 0:
            self.current_idx -= 1
        return self

    # Step 5 – Magic method to display items on current page
    def __str__(self):
        return "\n".join(str(item) for item in self.get_visible_items())


# Step 6 – Test the code
if __name__ == "__main__":
    alphabet = list("abcdefghijklmnopqrstuvwxyz")
    p = Pagination(alphabet, 4)
    print("Current Page Items:", p.get_visible_items())   # ['a','b','c','d']
    print()

    p.next_page()
    print("After next_page:", p.get_visible_items())      # ['e','f','g','h']
    print()

    p.last_page()
    print("After last_page:", p.get_visible_items())      # ['y','z']
    print()

    p.first_page()
    print("After first_page:", p.get_visible_items())     # ['a','b','c','d']
    print()

    p.go_to_page(3)
    print("Go to page 3:", p.get_visible_items())         # ['i','j','k','l']
    print()

    p.previous_page()
    print("Previous page:", p.get_visible_items())        # ['e','f','g','h']
    print()

    # Using __str__
    print("Using __str__():")
    print(p)
