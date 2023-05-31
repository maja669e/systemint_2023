import redis

#opret client
r = redis.Redis(host='localhost', port=6379, db=0)

# SET operation
r.set('mykey', 'Hello Redis!')

# GET operation
value = r.get('mykey')
if value is not None:
    print(value.decode())  # Convert bytes to string

# SET operation med experation
r.setex('myotherkey', 3600, 'Value with expiration')

# GET operation for expired key
expired_value = r.get('myotherkey')
if expired_value is None:
    print('Key has expired.')

# INCR operation (tæller)
if r.exists('counter'):
    r.incr('counter')  # Increment existing value
else:
    r.set('counter', 1)  # Set initial value as 1

counter_value = r.get('counter')
print('Counter:', counter_value.decode())

#delete operation
r.delete('mykey')
deleted_value = r.get('mykey')
if deleted_value is None:
    print('Key has been deleted.')
