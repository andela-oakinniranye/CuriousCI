exports.handlerNotRegisteredError = {
  status: 400,
  errors: [
    {
      code: "handler-01",
      source: "event/headers/X-GitHub-Event",
      message: "No handler registered for this event",
      detail: "Currently, handlers are only registered for API Gateway and CodeBuild"
    }
  ]
}
