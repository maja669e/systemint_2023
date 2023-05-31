import redis
import threading

def publisher():
    # opret client
    r = redis.Redis(host='localhost', port=6379, db=0)

    # publish besked 
    r.publish('mychannel', 'Hello TEST')

def subscriber():
    # Create a Redis client
    r = redis.Redis(host='localhost', port=6379, db=0)

    # Opret pubsub object og subscribe til kanal
    pubsub = r.pubsub()
    pubsub.subscribe('mychannel')

    # lytter for messages
    for message in pubsub.listen():
        if message['type'] == 'message':
            print('Received:', message['data'].decode())

# Run publisher and subscriber med tråde
publisher_thread = threading.Thread(target=publisher)
subscriber_thread = threading.Thread(target=subscriber)

# Start trådene
publisher_thread.start()
subscriber_thread.start()

# venter for threads til complete
publisher_thread.join()
subscriber_thread.join()
