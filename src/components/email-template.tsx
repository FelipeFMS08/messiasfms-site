import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  project: string;
  budget: string;
  message: string;
}

export function EmailTemplate({
  name,
  email,
  project,
  budget,
  message,
}: EmailTemplateProps) {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px", color: "#333" }}>
      <h1 style={{ color: "#E53E3E" }}>Novo Contato do Portfólio!</h1>
      <p>Você recebeu uma nova mensagem de contato através do seu site.</p>
      <hr style={{ border: "none", borderTop: "1px solid #eee" }} />
      <h2 style={{ fontSize: "16px" }}>Detalhes do Contato:</h2>
      <ul>
        <li>
          <strong>Nome:</strong> {name}
        </li>
        <li>
          <strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a>
        </li>
      </ul>
      <h2 style={{ fontSize: "16px" }}>Detalhes do Projeto:</h2>
      <ul>
        <li>
          <strong>Tipo de Projeto:</strong> {project}
        </li>
        <li>
          <strong>Orçamento Estimado:</strong> {budget}
        </li>
      </ul>
      <h2 style={{ fontSize: "16px" }}>Mensagem:</h2>
      <p
        style={{
          backgroundColor: "#f9f9f9",
          border: "1px solid #ddd",
          padding: "15px",
          borderRadius: "5px",
        }}
      >
        {message}
      </p>
      <hr style={{ border: "none", borderTop: "1px solid #eee" }} />
      <p style={{ fontSize: "12px", color: "#777" }}>
        Enviado em{" "}
        {new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}
      </p>
    </div>
  );
}
