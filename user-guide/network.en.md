---
layout: default
title: Network Configuration
nav_order: 30
parent: User Guide
has_toc: true
lang: en
---
# Network Configuration

OpenMandriva Lx provides several tools to help you configure and manage network connections. This guide covers both graphical and command-line methods.

## Graphical Network Configuration

### NetworkManager

OpenMandriva uses NetworkManager to manage network connections. You can access it through the system tray or directly via the Settings application.

**To configure a connection graphically:**

1. Click the network icon in the system tray
2. Select "Edit Connections..."
3. Choose the connection to configure or click "+" to create a new one
4. Configure the settings (IPv4, IPv6, DNS, etc.)
5. Click "Save"

### Plasma Network Management

If you're using KDE Plasma, you can access additional network settings through:

- **System Settings** → **Network** → **Connections**
- Or run `kcmshell5 kcm_networkmanager` from the terminal

## Command-Line Network Configuration

### Using nmcli

`nmcli` (NetworkManager Command Line Interface) allows you to manage connections from the terminal:

```bash
# List available connections
nmcli connection show

# List active connections
nmcli device status

# Create a new connection
nmcli connection add type ethernet ifname eth0

# Modify a connection
nmcli connection modify "Connection Name" ipv4.addresses "192.168.1.100/24"

# Activate a connection
nmcli connection up "Connection Name"

# Deactivate a connection
nmcli connection down "Connection Name"
```

### Using nmtui

`nmtui` (Ninja Text User Interface) provides a text-based interface for NetworkManager:

```bash
nmtui
```

This opens an interactive menu for configuring:
- Editing connections
- Activating/deactivating connections
- Setting up bonding, VLANs, and tunnels

### Using ip command

For basic network configuration, you can use the `ip` command:

```bash
# Show network interfaces
ip addr show

# Bring up an interface
ip link set dev eth0 up

# Assign an IP address
ip addr add 192.168.1.100/24 dev eth0

# Set default gateway
ip route add default via 192.168.1.1
```

## Wi-Fi Configuration

### Graphical Method

1. Click the network icon in the system tray
2. Select a Wi-Fi network from the list
3. Enter the password when prompted
4. Check "Remember this network" if desired

### Command-Line Method

```bash
# List available Wi-Fi networks
nmcli device wifi list

# Connect to a Wi-Fi network
nmcli device wifi connect "SSID" password "password"

# Scan for networks
nmcli device wifi rescan
```

## Troubleshooting

### Check Network Status

```bash
# Check if network interface is up
ip link show

# Check IP addresses assigned
ip addr show

# Check routing table
ip route show

# Check DNS configuration
cat /etc/resolv.conf
```

### Common Issues

**No network connection after boot:**
- Check if the network interface is enabled: `nmcli device status`
- Restart NetworkManager: `systemctl restart NetworkManager`

**Can't resolve domain names:**
- Check DNS settings in `/etc/resolv.conf`
- Use `dnssec-trigger` if DNS issues persist

**Wi-Fi not showing available networks:**
- Bring up the interface: `ip link set wlan0 up`
- Check if the wireless adapter is recognized: `lspci | grep -i wireless`

## Advanced Configuration

### Bonding (Link Aggregation)

Create bonded interfaces for increased throughput and redundancy:

```bash
nmcli connection add type bond ifname bond0 mode active-backup
nmcli connection add type ethernetSlave ifname eth0 MASTER bond0
nmcli connection add type ethernetSlave ifname eth1 MASTER bond0
nmcli connection up bond0
```

### VLAN Configuration

```bash
nmcli connection add type vlan con-name vlan10 dev eth0 id 10
nmcli connection modify vlan10 ipv4.addresses "192.168.10.1/24"
nmcli connection up vlan10
```

### Bridge Configuration

For virtualization or container networking:

```bash
nmcli connection add type bridge ifname br0
nmcli connection add type bridge-slave ifname eth0 master br0
nmcli connection modify br0 ipv4.addresses "192.168.1.1/24"
nmcli connection up br0
```