import { constantsData } from "data";
import React from "react";
import { OfflineView } from "views";

class NetworkErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        this.state = { hasError: false };
    }

    static getDerivedStateFromError(err) {
        if (err?.name === constantsData.chunkLoadError) return { hasError: true };
    }

    render() {
        if (this.state.hasError) { // eslint-disable-line
            return <OfflineView />;
        }

        return this.props.children; // eslint-disable-line
    }
}

export default NetworkErrorBoundary;
