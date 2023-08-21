import React, { useState } from 'react';
import './ServiceAPI.css';

function ServiceAPI() {
    const [selectedServices, setSelectedServices] = useState([]);
    const [downloadUrl, setDownloadUrl] = useState('');
    const [downloadJsonUrl, setDownloadJsonUrl] = useState('');

    const serviceOptions = ['Api Management', 'App Service', 'Application Gateway', 'Automation', 'Azure Active Directory Domain Services', 'Azure Advisor', 'Azure Analysis Services', 'Azure App Configuration', 'Azure Arc Enabled Kubernetes', 'Azure Arc Enabled Servers', 'Azure Bot Service', 'Azure Cache For Redis', 'Azure Center For Sap Solutions', 'Azure Cognitive Search', 'Azure Communication Services', 'Azure Communications Gateway', 'Azure Container Apps', 'Azure Cosmos Db', 'Azure Cosmos Db For Postgresql', 'Azure Data Box', 'Azure Data Explorer', 'Azure Data Share', 'Azure Database For Mariadb', 'Azure Database For Mysql  Flexible Server', 'Azure Database For Postgresql Flexible Server', 'Azure Database Migration Service', 'Azure Databricks', 'Azure Ddos Protection', 'Azure Dedicated Hsm', 'Azure Devtest Labs', 'Azure Digital Twins', 'Azure Dns', 'Azure File Sync', 'Azure Firewall', 'Azure Firewall Manager', 'Azure Front Door', 'Azure Hpc Cache', 'Azure Information Protection', 'Azure Kubernetes Service Aks', 'Azure Kubernetes Service On Azure Stack Hci', 'Azure Lighthouse', 'Azure Load Balancer', 'Azure Managed Applications', 'Azure Migrate', 'Azure Monitor', 'Azure Nat Gateway', 'Azure Netapp Files', 'Azure Open Datasets', 'Azure Policy', 'Azure Public Ip', 'Azure Purview', 'Azure Remote Rendering', 'Azure Resource Graph', 'Azure Resource Manager', 'Azure Signalr Service', 'Azure Spatial Anchors', 'Azure Sphere', 'Azure Spring Apps', 'Azure Sql', 'Azure Stack Edge', 'Azure Stream Analytics', 'Azure Virtual Desktop', 'Azure Vmware Solution', 'Azure Web Pubsub', 'Batch', 'Cloud Shell', 'Cognitive Services', 'Container Instances', 'Container Registry', 'Content Delivery Network', 'Cost Management', 'Customer Lockbox For Microsoft Azure', 'Data Factory', 'Data Lake Analytics', 'Event Grid', 'Event Hubs', 'Functions', 'Intelligent Recommendations', 'Iot Central', 'Iot Hub', 'Key Vault', 'Key Vault Managed Hsm', 'Media Services', 'Microsoft Azure Attestation', 'Microsoft Azure Managed Instance For Apache Cassandra', 'Microsoft Azure Peering Service', 'Microsoft Defender For Iot', 'Microsoft Sentinel', 'Network Watcher', 'Notification Hubs', 'Nutanix On Azure', 'Resource Mover', 'Service Bus', 'Sql Iaas', 'Storage', 'Traffic Manager', 'Trusted Hardware Identity Management', 'Universal Print', 'Virtual Network', 'Virtual Network Nat', 'Virtual Wan', 'Vpn Gateway', '~$App Service'];

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const selectedValues = selectedServices.join(','); // Combine selected values with commas
        const formData = new FormData();
        formData.append('services', selectedValues);

        const apiUrl = 'http://localhost:8000/app/Export_Services_Data';

        var requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
          };
          
          fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                    const url = data.excel_url; // Assuming the key is 'url' in your JSON response
                    setDownloadUrl(url); // Set the URL in state
                    const json_url = data.json_url;
                    setDownloadJsonUrl(json_url)
                })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        
        // fetch(apiUrl, {
        //     method: 'POST',
        //     body: formData
        // })
        // .then(response => response.json()) // Parse the JSON response
        // .then(data => {
        //     const url = data.url; // Assuming the key is 'url' in your JSON response
        //     setDownloadUrl(url); // Set the URL in state
        // })
        // .catch(error => {
        //     console.error('Error fetching the JSON:', error);
        // });
    };

    return (
        <div className="container">
          <h1>Download Excel or JSON for Security Benchmarks</h1>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="services">Select Services:</label>
            <br />
            <select
              multiple
              value={selectedServices}
              onChange={(e) =>
                setSelectedServices([...e.target.selectedOptions].map((option) => option.value))
              }
            >
              {serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <br />
            <br />
            <button type="submit">Submit</button>
            <br />
            <br />
            <br />
            {downloadUrl && (
              <div>
                <br />
                <a href={downloadUrl}>Download Excel</a>
              </div>
            )}
            <br />
            <br />
            {downloadJsonUrl && (
              <div>
                <br />
                <a href={downloadJsonUrl}>Download Json File</a>
              </div>
            )}
          </form>
        </div>
      );
}

export default ServiceAPI;
