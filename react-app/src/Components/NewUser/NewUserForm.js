import { html } from "https://unpkg.com/htm/preact/standalone.module.js";

const NewUserForm = ({ formData, handleInput, handleSubmit }) => {
  return html`
    <form onSubmit=${handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value=${formData.username}
          onInput=${handleInput}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value=${formData.password}
          onInput=${handleInput}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value=${formData.email}
          onInput=${handleInput}
        />
      </label>
      <br />
      <label>
        Display Name:
        <input
          type="text"
          name="displayName"
          value=${formData.displayName}
          onInput=${handleInput}
        />
      </label>
      <br />
      <button type="submit">Create User</button>
    </form>
  `;
};

export default NewUserForm;
