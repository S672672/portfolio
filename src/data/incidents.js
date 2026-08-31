export const incidents = [
  {
    id: "docker-environment",
    title: "Docker Environment Setup Issues",
    status: "resolved",
    icon: "🐳",
    problem:
      "Encountered inconsistent behavior when setting up Docker containers for development — environment variables, port mappings, and volume mounts were not working as expected across different machines.",
    initialHypothesis:
      "Assumed it was a Docker version compatibility issue between local and deployment environments.",
    investigation:
      "Systematically compared Docker configurations, checked Docker Compose file syntax, inspected container logs, and verified network configurations between containers.",
    rootCause:
      "The issue was a combination of incorrect volume mount paths for the host OS and missing environment variable definitions in the docker-compose.yml file.",
    resolution:
      "Created platform-specific Docker configurations, added proper environment variable templates (.env files), and implemented a validation script to verify Docker setup before starting services.",
    lesson:
      "Docker configurations need to be tested across different operating systems. Using .env files and validation scripts prevents common deployment issues.",
    tags: ["docker", "devops", "environment"],
    relatedProject: null,
  },
  {
    id: "database-connection",
    title: "Database Connection Pool Exhaustion",
    status: "resolved",
    icon: "🗃️",
    problem:
      "A Node.js application began throwing connection errors under moderate load. The application would work fine for a few minutes, then start failing with 'too many connections' errors.",
    initialHypothesis:
      "Thought the database server had reached its maximum connection limit due to too many concurrent users.",
    investigation:
      "Monitored active database connections using SHOW PROCESSLIST, traced connection creation points in the application code, and used connection pooling metrics to identify the bottleneck.",
    rootCause:
      "Database connections were being created inside request handlers but not properly released back to the pool. Some error paths were not closing connections, causing gradual pool exhaustion.",
    resolution:
      "Implemented proper connection lifecycle management with try/finally blocks, configured connection pool limits and timeouts, and added monitoring for pool utilization metrics.",
    lesson:
      "Always ensure database connections are properly released, especially in error paths. Connection pooling requires careful lifecycle management and monitoring.",
    tags: ["database", "nodejs", "backend", "debugging"],
    relatedProject: "pet-adopt",
  },
  {
    id: "react-state-race",
    title: "React State Update Race Condition",
    status: "resolved",
    icon: "⚛️",
    problem:
      "In a React application, rapid user interactions (clicking buttons quickly) caused inconsistent UI state — sometimes displaying stale data, sometimes showing duplicate entries.",
    initialHypothesis:
      "Assumed it was a caching issue or that the API was returning stale data.",
    investigation:
      "Added console logging to state updates, used React DevTools to track state changes, and reviewed the component's effect dependencies and state update patterns.",
    rootCause:
      "State updates based on previous state were using stale closures. The component was capturing state values in closures that did not reflect the latest state when multiple updates were batched.",
    resolution:
      "Refactored state updates to use functional updates (setState(prev => ...)), ensured all dependencies in useEffect hooks were properly listed, and used useRef for values that should persist across renders without causing re-renders.",
    lesson:
      "React state updates based on previous state should always use the functional form. Understanding closures and stale references is critical for reliable state management.",
    tags: ["react", "frontend", "javascript", "debugging"],
    relatedProject: "pet-adopt",
  },
  {
    id: "api-error-handling",
    title: "Silent API Error Failures",
    status: "resolved",
    icon: "🔗",
    problem:
      "An API integration was silently failing — the application showed a blank page instead of error messages when the external API was unavailable or returned unexpected data formats.",
    initialHypothesis:
      "Thought the API was simply slow and the loading state was not being displayed correctly.",
    investigation:
      "Used browser network tab to inspect actual API responses, added comprehensive error logging at each fetch point, and tested with the API deliberately disabled.",
    rootCause:
      "The fetch calls had basic error handling but did not check the response status code (e.g., 404, 500). When the API returned a non-JSON error page, the JSON parsing threw an uncaught exception that was swallowed by the error boundary.",
    resolution:
      "Added response status checking (response.ok), implemented structured error handling with specific error messages for different failure modes, created user-friendly error states, and added retry logic for transient failures.",
    lesson:
      "API error handling must go beyond network errors — check status codes, validate response formats, and provide meaningful feedback to users when things go wrong.",
    tags: ["api", "frontend", "error-handling", "javascript"],
    relatedProject: "ip-address-tracker",
  },
];
