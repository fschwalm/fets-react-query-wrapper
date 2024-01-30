export default {
  openapi: "3.0.0",
  info: {
    title: "Notificações API",
    version: "1.0.0",
    description: "API para gerenciamento de notificações",
  },
  basePath: "/",
  components: {
    schemas: {
      Notification: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          titulo: {
            type: "string",
          },
          texto: {
            type: "string",
          },
          prioridade: {
            type: "number",
          },
          tipoMensagem: {
            type: "number",
          },
          dataHoraEnvio: {
            type: "string",
          },
          qtdMensagemLida: {
            type: "number",
          },
          salas: {
            type: "string",
          },
        },
      },
    },
  },
  swagger: "2.0",
  paths: {
    "/notifications": {
      post: {
        summary: "Criar uma nova notificação",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Notification",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Notificação criada com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Notification",
                },
              },
            },
          },
        },
      },
      get: {
        summary: "Listar notificações (com paginação e pesquisa)",
        parameters: [
          {
            in: "query",
            name: "page",
            schema: {
              type: "integer",
            },
            description: "Número da página a ser recuperada",
          },
          {
            in: "query",
            name: "titulo",
            schema: {
              type: "string",
            },
            description: "Filtrar notificações pelo título",
          },
          {
            in: "query",
            name: "tipoMensagem",
            schema: {
              type: "integer",
            },
            description: "Filtrar notificações pelo tipo de mensagem",
          },
          {
            in: "query",
            name: "salas",
            schema: {
              type: "string",
            },
            description: "Filtrar notificações por salas",
          },
        ],
        responses: {
          "200": {
            description: "Notificações listadas com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    totalPages: {
                      type: "integer",
                    },
                    notifications: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Notification",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/notifications/{id}": {
      get: {
        summary: "Obter uma notificação por ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID da notificação",
          },
        ],
        responses: {
          "200": {
            description: "Notificação obtida com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Notification",
                },
              },
            },
          },
          "404": {
            description: "Notificação não encontrada",
          },
        },
      },
      put: {
        summary: "Atualizar uma notificação existente por ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID da notificação a ser atualizada",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Notification",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Notificação atualizada com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Notification",
                },
              },
            },
          },
          "404": {
            description: "Notificação não encontrada",
          },
        },
      },
      delete: {
        summary: "Excluir uma notificação por ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID da notificação a ser excluída",
          },
        ],
        responses: {
          "200": {
            description: "Notificação excluída com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Notification",
                },
              },
            },
          },
          "404": {
            description: "Notificação não encontrada",
          },
        },
      },
    },
  },
  definitions: {},
  responses: {},
  parameters: {},
  securityDefinitions: {},
  tags: [],
} as const;
