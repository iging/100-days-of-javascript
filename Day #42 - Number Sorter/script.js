const sortButton = document.getElementById("sort");

const initializeApp = () => {
  const dropdowns = document.querySelectorAll(".values-dropdown");
  const defaultValues = [8, 2, 5, 1, 9];

  dropdowns.forEach((dropdown, index) => {
    dropdown.value = defaultValues[index] || 0;
  });
  sortInputArray({ preventDefault: () => {} });
};

const sortInputArray = (event) => {
  event.preventDefault();

  sortButton.disabled = true;
  sortButton.innerHTML = '<span class="spinner"></span> Sorting...';

  const inputValues = [
    ...document.getElementsByClassName("values-dropdown"),
  ].map((dropdown) => Number(dropdown.value));

  setTimeout(() => {
    const sortedValues = [...inputValues].sort((a, b) => a - b);
    updateUIWithAnimation(sortedValues);

    setTimeout(() => {
      sortButton.disabled = false;
      sortButton.textContent = "Sort Again";
    }, 300);
  }, 500);
};

const updateUIWithAnimation = (array) => {
  const outputElements = [];

  for (let i = 0; i < array.length; i++) {
    const element = document.getElementById(`output-value-${i}`);
    if (element) {
      outputElements.push(element);
    }
  }

  outputElements.forEach((element, index) => {
    element.style.animation = "none";
    element.offsetHeight;
    element.textContent = array[index];
    element.style.animation = "popIn 0.3s ease-out forwards";
    element.style.animationDelay = `${index * 0.1}s`;
    element.style.opacity = "0";
    const previousValue = parseInt(element.dataset.previousValue) || 0;
    const currentValue = array[index];

    if (previousValue !== currentValue) {
      element.style.color = "#4CAF50";
      setTimeout(() => {
        element.style.transition = "color 1s ease";
        element.style.color = "";
      }, 300);
    }

    element.dataset.previousValue = currentValue;
  });
};

const bubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }

  return array;
};

const selectionSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    const temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
  }

  return array;
};

const insertionSort = (array) => {
  for (let i = 1; i < array.length; i++) {
    const currValue = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > currValue) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = currValue;
  }
  return array;
};

document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
  sortButton.addEventListener("click", sortInputArray);

  const dropdowns = document.querySelectorAll(".values-dropdown");
  dropdowns.forEach((dropdown, index) => {
    dropdown.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sortInputArray(e);
      } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const currentValue = parseInt(dropdown.value);
        const newValue =
          e.key === "ArrowDown"
            ? Math.max(0, currentValue - 1)
            : Math.min(9, currentValue + 1);
        dropdown.value = newValue;
      }
    });
  });
});
