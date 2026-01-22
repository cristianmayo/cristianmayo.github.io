# Mermaid Diagrams Quick Reference

This guide provides quick examples of the most common Mermaid diagram types you can use in your blog posts.

## Basic Syntax

To add a Mermaid diagram to your blog post, use a code block with `mermaid` as the language:

    ```mermaid
    graph TD
        A[Start] --> B[End]
    ```

---

## Flowchart

### Basic Flowchart
```mermaid
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Success]
    B -->|No| D[Failure]
    C --> E[End]
    D --> E
```

### Node Shapes
- `A[Rectangle]` - Rectangle
- `B(Rounded)` - Rounded edges
- `C([Stadium])` - Stadium shape
- `D[[Subroutine]]` - Subroutine
- `E[(Database)]` - Database
- `F((Circle))` - Circle
- `G>Flag]` - Flag
- `H{Diamond}` - Diamond/Decision
- `I{{Hexagon}}` - Hexagon

---

## Sequence Diagram

```mermaid
sequenceDiagram
    participant A as Alice
    participant B as Bob
    A->>B: Hello Bob!
    B->>A: Hi Alice!
    Note over A,B: A conversation
```

### Arrow Types
- `->` Solid line without arrow
- `-->` Dotted line without arrow
- `->>` Solid line with arrowhead
- `-->>` Dotted line with arrowhead
- `-x` Solid line with cross
- `--x` Dotted line with cross

---

## Gantt Chart

```mermaid
gantt
    title Project Schedule
    dateFormat YYYY-MM-DD
    section Phase 1
    Task 1 :a1, 2024-01-01, 30d
    Task 2 :after a1, 20d
    section Phase 2
    Task 3 :2024-02-20, 12d
    Task 4 :24d
```

---

## Class Diagram

```mermaid
classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    class Duck{
        +String beakColor
        +swim()
        +quack()
    }
    class Fish{
        -int sizeInFeet
        -canEat()
    }
```

### Relationship Types
- `<|--` Inheritance
- `*--` Composition
- `o--` Aggregation
- `-->` Association
- `--` Link (Solid)
- `..>` Dependency
- `..|>` Realization
- `..` Link (Dashed)

---

## State Diagram

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Processing : Start
    Processing --> Complete : Finish
    Processing --> Error : Fail
    Error --> Idle : Reset
    Complete --> [*]
```

---

## Entity Relationship Diagram

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
    
    CUSTOMER {
        string name
        string email
    }
    ORDER {
        int orderNumber
        date orderDate
    }
```

### Relationship Cardinality
- `|o` Zero or one
- `||` Exactly one
- `}o` Zero or more
- `}|` One or more

---

## Pie Chart

```mermaid
pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
```

---

## Git Graph

```mermaid
gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
```

---

## User Journey

```mermaid
journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me
```

---

## Tips

1. **Test your diagrams** at [Mermaid Live Editor](https://mermaid.live/)
2. **Keep diagrams simple** - Complex diagrams are hard to read
3. **Use meaningful names** - Make node and relationship names descriptive
4. **Add notes** - Use `Note` to add explanations
5. **Check rendering** - Always preview locally before publishing

## Resources

- [Mermaid Official Documentation](https://mermaid.js.org/)
- [Mermaid Syntax Reference](https://mermaid.js.org/intro/syntax-reference.html)
- [Mermaid Live Editor](https://mermaid.live/)
- [Mermaid GitHub](https://github.com/mermaid-js/mermaid)

---

**Note:** All these diagram types are fully supported in your blog posts!
