const toggleSwitch = (id) =>
  `
    <label class="switch">
      <input id="${id}" type="checkbox" unchecked>
      <span class="slider round"></span>
    </label>
  `;

export default toggleSwitch;
