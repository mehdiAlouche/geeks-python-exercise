#Exercises XP Gold : Bank Account

class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance
        self.username = ""
        self.password = ""
        self.authenticated = False
    
    def deposit(self, amount):
        if not self.authenticated:
            raise Exception("User must be authenticated to perform this action")
        
        if not isinstance(amount, int) or amount <= 0:
            raise Exception("Deposit amount must be a positive integer")
        
        self.balance += amount
        print(f"Deposited ${amount}. New balance: ${self.balance}")
    
    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("User must be authenticated to perform this action")
        
        if not isinstance(amount, int) or amount <= 0:
            raise Exception("Withdrawal amount must be a positive integer")
        
        if amount > self.balance:
            raise Exception("Insufficient funds")
        
        self.balance -= amount
        print(f"Withdrew ${amount}. New balance: ${self.balance}")
    
    def authenticate(self, username, password):
        if self.username == username and self.password == password:
            self.authenticated = True
            return True
        return False


class MinimumBalanceAccount(BankAccount):
    def __init__(self, balance=0, minimum_balance=0):
        super().__init__(balance)
        self.minimum_balance = minimum_balance
    
    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("User must be authenticated to perform this action")
        
        if not isinstance(amount, int) or amount <= 0:
            raise Exception("Withdrawal amount must be a positive integer")
        
        if self.balance - amount < self.minimum_balance:
            raise Exception(f"Cannot withdraw ${amount}. Minimum balance of ${self.minimum_balance} must be maintained")
        
        self.balance -= amount
        print(f"Withdrew ${amount}. New balance: ${self.balance}")


class ATM:
    def __init__(self, account_list, try_limit=2):
        if not isinstance(account_list, list):
            raise Exception("account_list must be a list")
        
        for account in account_list:
            if not isinstance(account, (BankAccount, MinimumBalanceAccount)):
                raise Exception("All accounts in account_list must be BankAccount or MinimumBalanceAccount instances")
        
        try:
            if not isinstance(try_limit, int) or try_limit <= 0:
                raise Exception("try_limit must be a positive integer")
        except Exception:
            print("Invalid try_limit provided. Setting to default value of 2.")
            try_limit = 2
        
        self.account_list = account_list
        self.try_limit = try_limit
        self.current_tries = 0
        self.current_account = None
        
        self.show_main_menu()
    
    def show_main_menu(self):
        while True:
            print("\n=== ATM Main Menu ===")
            print("1. Log in")
            print("2. Exit")
            
            choice = input("Please select an option (1-2): ").strip()
            
            if choice == "1":
                username = input("Enter username: ").strip()
                password = input("Enter password: ").strip()
                self.log_in(username, password)
            elif choice == "2":
                print("Thank you for using our ATM. Goodbye!")
                break
            else:
                print("Invalid choice. Please select 1 or 2.")
    
    def log_in(self, username, password):
        for account in self.account_list:
            if account.authenticate(username, password):
                print(f"Login successful! Welcome, {username}!")
                self.current_account = account
                self.current_tries = 0
                self.show_account_menu(account)
                return
        
        self.current_tries += 1
        print(f"Invalid username or password. Attempts remaining: {self.try_limit - self.current_tries}")
        
        if self.current_tries >= self.try_limit:
            print("Maximum login attempts reached. ATM shutting down.")
            exit()
    
    def show_account_menu(self, account):
        while True:
            print(f"\n=== Account Menu - Balance: ${account.balance} ===")
            print("1. Deposit")
            print("2. Withdraw")
            print("3. Exit")
            
            choice = input("Please select an option (1-3): ").strip()
            
            if choice == "1":
                try:
                    amount = int(input("Enter amount to deposit: "))
                    account.deposit(amount)
                except ValueError:
                    print("Please enter a valid integer amount.")
                except Exception as e:
                    print(f"Error: {e}")
            
            elif choice == "2":
                try:
                    amount = int(input("Enter amount to withdraw: "))
                    account.withdraw(amount)
                except ValueError:
                    print("Please enter a valid integer amount.")
                except Exception as e:
                    print(f"Error: {e}")
            
            elif choice == "3":
                print("Logging out...")
                account.authenticated = False
                self.current_account = None
                break
            
            else:
                print("Invalid choice. Please select 1, 2, or 3.")


if __name__ == "__main__":
    account1 = BankAccount(1000)
    account1.username = "mehdi"
    account1.password = "password123"
    
    account2 = MinimumBalanceAccount(500, 100)
    account2.username = "ossama"
    account2.password = "password123"
    
    account3 = BankAccount(2000)
    account3.username = "anass"
    account3.password = "password123"
    
    atm = ATM([account1, account2, account3], 3)
