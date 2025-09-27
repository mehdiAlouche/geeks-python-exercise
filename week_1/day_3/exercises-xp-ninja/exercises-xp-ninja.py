#Exercise 1 : Call History
class Phone:
    def __init__(self, phone_number):
        self.phone_number = phone_number
        self.call_history = []  
        self.messages = []      

    def call(self, other_phone):
        """Simulate a phone call between two phones."""
        call_info = f"{self.phone_number} called {other_phone.phone_number}"
        print(call_info)
        self.call_history.append(call_info)

    def show_call_history(self):
        """Print the call history of this phone."""
        print("Call History:")
        for call in self.call_history:
            print(call)

    def send_message(self, other_phone, content):
        """Send a message to another phone."""
        message = {
            "to": other_phone.phone_number,
            "from": self.phone_number,
            "content": content
        }
        self.messages.append(message)
        other_phone.messages.append(message)  
        print(f"Message sent from {self.phone_number} to {other_phone.phone_number}: {content}")

    def show_outgoing_messages(self):
        """Show messages sent from this phone."""
        print("Outgoing Messages:")
        for msg in self.messages:
            if msg["from"] == self.phone_number:
                print(msg)

    def show_incoming_messages(self):
        """Show messages received by this phone."""
        print("Incoming Messages:")
        for msg in self.messages:
            if msg["to"] == self.phone_number:
                print(msg)

    def show_messages_from(self, number):
        """Show all messages received from a specific number."""
        print(f"Messages from {number}:")
        for msg in self.messages:
            if msg["from"] == number and msg["to"] == self.phone_number:
                print(msg)



# Test the class

# Create phone objects
phone1 = Phone("111-111-1111")
phone2 = Phone("222-222-2222")

# Make calls
phone1.call(phone2)
phone2.call(phone1)

# Show call history
phone1.show_call_history()
phone2.show_call_history()

# Send messages
phone1.send_message(phone2, "Hello, how are you?")
phone2.send_message(phone1, "I’m good, thanks!")

# Show outgoing/incoming
phone1.show_outgoing_messages()
phone2.show_incoming_messages()

# Show messages from specific number
phone1.show_messages_from("222-222-2222")
