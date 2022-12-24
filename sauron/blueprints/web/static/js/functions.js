function build_form_contact () {
  var qtd_contatos = parseInt(document.getElementById('qtd_contatos').value);
  var div_contatos = document.getElementById('contatos');

  removeChilds(div_contatos);

  for (let i = 0; i < qtd_contatos; i++) {
    let label_contato = document.createElement("LABEL");
    let input_contato_nome = document.createElement("INPUT");
    let input_contato_email = document.createElement("INPUT");
    let input_contato_telefone = document.createElement("INPUT");

    let contato = "contato" + (i+1).toString();

    label_contato.setAttribute("for", contato);
    label_contato.setAttribute("class", "form-label");
    label_contato.innerHTML = (i+1).toString() + "° Contato";

    input_contato_nome.setAttribute("type", "text");
    input_contato_nome.setAttribute("id", contato);
    input_contato_nome.setAttribute("name", contato);
    input_contato_nome.setAttribute("placeholder", "Nome contato");
    input_contato_nome.setAttribute("class", "form-control");

    input_contato_email.setAttribute("type", "email");
    input_contato_email.setAttribute("id", "email-" + contato);
    input_contato_email.setAttribute("name", "email-" + contato);
    input_contato_email.setAttribute("placeholder", "Email contato");
    input_contato_email.setAttribute("class", "form-control");

    input_contato_telefone.setAttribute("type", "tel");
    input_contato_telefone.setAttribute("id", "telefone-" + contato);
    input_contato_telefone.setAttribute("name", "telefone-" + contato);
    input_contato_telefone.setAttribute("placeholder", "Telefone contato");
    input_contato_telefone.setAttribute("class", "form-control");

    div_contatos.appendChild(label_contato);
    div_contatos.appendChild(input_contato_nome);
    div_contatos.appendChild(input_contato_email);
    div_contatos.appendChild(input_contato_telefone);
  }
}

function removeChilds(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}
