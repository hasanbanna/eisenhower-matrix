# Eisenhower Decision Matrix

Eisenhower decision matrix (aka Covey matrix) is a method of prioritizing your tasks on the basis of their urgency/importance.

I wanted to experiment with this matrix with my current workflow but most of the implementations for this matrix out there build a whole todo app around it. So I decided to create this interactive matrix that generates an ordered list which can be further processed with your choice of todo app.

## Usage

[try it](https://eisenhower-matrix.hasanbanna1.repl.co/) 

```bash
git clone https://github.com/hasanbanna/eisenhower-matrix.git
cd eisenhower-matrix
npm install
npm run serve
```

![matrix-ui](https://user-images.githubusercontent.com/5116462/125142246-31ba8b00-e10f-11eb-8d38-9348790cf5d2.PNG)

Add a list of your tasks into the textarea and visually prioritise them using the matrix by dragging the points onto the four different quadrants which correspond to the four different priority groups and then use the buttons to copy the ordered tasks in plain text or in org format.

### org-mode output

![tasks-org](https://user-images.githubusercontent.com/5116462/125142272-4139d400-e10f-11eb-94e1-fa72b2328c55.PNG)

## Built with

* Chart.js 3+
* Vue
