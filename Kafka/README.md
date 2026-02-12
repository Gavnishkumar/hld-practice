# Kafka Message Streaming System

A complete Apache Kafka implementation demonstrating producer-consumer patterns with consumer groups and partition management.

---

## 🎯 Architecture Overview

![Kafka Architecture](./Images/running%20.png)

---

## 📋 Project Structure

```
Kafka/
├── admin.js              # Kafka admin - creates topics
├── producer.js           # Message producer
├── consumer.js           # Original single consumer (backup)
├── consumer1.js          # Consumer 1 (Group-1)
├── consumer2.js          # Consumer 2 (Group-1)
├── consumer3.js          # Consumer (Group-2)
├── kafka.js              # Kafka configuration
├── package.json          # Dependencies
└── Images/
    └── running .png      # Architecture diagram
```

---

## 🔧 Setup & Installation

### Prerequisites
- Node.js v14+
- Apache Kafka running on `<private_ip>:9092`

### Install Dependencies

```bash
npm install
```

---

## 🚀 Getting Started

### 1. Create Topics

Run the admin script to create the `rider-updates` topic with 2 partitions:

```bash
node admin.js
```

**Output:**
```
Connecting admin...
Admin connected Success...
Disconnecting Admin..
```

---

## 📊 Consumer Groups Architecture

### Group-1 (Load Balanced)
- **Consumer 1** → Partition 0
- **Consumer 2** → Partition 1
- Messages are **distributed** between consumers

### Group-2 (Independent)
- **Consumer 3** → All Partitions
- Receives **all messages** independently

---

## 🏃 Running the System

### Terminal 1: Start Consumer 1 (Group-1)
```bash
node consumer1.js
```

### Terminal 2: Start Consumer 2 (Group-1)
```bash
node consumer2.js
```

### Terminal 3: Start Consumer (Group-2)
```bash
node consumer3.js
```

### Terminal 4: Start Producer
```bash
node producer.js
```

---

## 📨 Sending Messages

In the producer terminal, send messages with partition routing:

```
> message1 north
> message2 south
> message3 north
> message4 south
```

**Partition Routing:**
- `north` → Partition 0
- `south` → Partition 1

---

## 📌 Message Flow Example

```
Producer sends: "delivery1 north"
    ↓
Goes to: Partition 0
    ↓
Consumed by:
  ├─ Consumer 1 (Group-1) ✓
  └─ Consumer 3 (Group-2) ✓

Producer sends: "delivery2 south"
    ↓
Goes to: Partition 1
    ↓
Consumed by:
  ├─ Consumer 2 (Group-1) ✓
  └─ Consumer 3 (Group-2) ✓
```

---

## 📤 Consumer Output Format

Each message displays:

```json
{
  "partition": 0,
  "offset": 15,
  "value": "delivery1"
}
```

---

## 🔑 Key Concepts

| Concept | Description |
|---------|-------------|
| **Topic** | `rider-updates` - message channel with 2 partitions |
| **Producer** | Sends messages with north/south routing |
| **Consumer Group** | Coordinates consumption among multiple consumers |
| **Partition** | Parallel processing unit (0 for north, 1 for south) |
| **Offset** | Message position in partition |
| **ClientId** | Unique identifier for each consumer instance |

---

## ⚙️ Configuration

### Kafka Connection
```javascript
brokers: ['<private_ip>:9092']
```

### Topic Configuration
```javascript
{
  topic: 'rider-updates',
  numPartitions: 2
}
```

### Consumer Groups
- **Group-1**: `my-app-consumer1`, `my-app-consumer2`
- **Group-2**: `my-app-consumer3`


## 📚 Learning Outcomes

✅ Producer-Consumer pattern  
✅ Partition-based message distribution  
✅ Consumer group rebalancing  
✅ Load balancing across consumers  
✅ Message offset tracking  
✅ Kafka broker connectivity  

---

## 📖 Files Overview

### admin.js
Creates Kafka topics with specified partitions

### producer.js
- Reads user input from terminal
- Routes messages to partitions based on location (north/south)
- Sends to `rider-updates` topic

### consumer1.js & consumer2.js
- Part of `group-1`
- Each gets assigned one partition
- Displays messages with partition info

### consumer3.js
- Part of `group-2`
- Independent group
- Receives all messages

---

## 🔗 Useful Commands

```bash
# Start all consumers in parallel
node consumer1.js & node consumer2.js & node consumer3.js

# Run producer
node producer.js

# Check npm dependencies
npm list kafkajs
```

---

## 📞 Notes

- Kafka version: `^2.2.4`
- Node.js: v24+
- Broker IP: `<private_ip>:9092`
- Topic: `rider-updates` (2 partitions)

---

**Happy Streaming! 🚀**
