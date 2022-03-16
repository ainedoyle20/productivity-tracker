import React from "react";

import { ErrorImageContainer, ErrorImageOverlay, ErrorImageText} from './error-boundary.styles';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <ErrorImageOverlay>
            <ErrorImageContainer imageUrl='https://i.imgur.com/WvEu0cO.png' />
            <ErrorImageText>Sorry this page could not be loaded...</ErrorImageText>
          </ErrorImageOverlay>
        );
      }
  
      return this.props.children; 
    }
}

export default ErrorBoundary;
