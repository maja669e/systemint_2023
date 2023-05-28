import requests

base_url = "https://fiotext.com"

def send_sms(phone_number, message):
    url = f"{base_url}/send-sms"
    form_data = {
        "phone_number": phone_number,
        "message": message
    }

    response = requests.post(url, data=form_data)
    if response.status_code == 200:
        print("SMS sent successfully!")
    else:
        print(f"Failed to send SMS. Status code: {response.status_code}")
        print(response.text)


phone_number = '+45 60 60 61 13'
message = "Test"

send_sms(phone_number, message)
