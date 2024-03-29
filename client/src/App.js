import React, { useState, useEffect, useRef } from "react";
// how to import the remote module in a React component?

import { Layout, Menu, Button, Divider } from "antd";
import CarChasis from "./components/CarChasis";
import GasBrakeChart from "./components/GasBrakeChart";
import SpeedChart from "./components/SpeedChart";
import ABSTCChart from "./components/ABSTCChart";
import RPMChart from "./components/RPMChart";
import TurboBoostChart from "./components/TurboBoostChart";
import GEARChart from "./components/GEARChart";
import FFBChart from "./components/FFBChart";
import SteerAngleChart from "./components/SteerAngleChart";
import SuspensionTravelChart from "./components/SuspensionTravelChart";
import WheelSpeedChart from "./components/WheelSpeedChart";
import WheelSpeedDiffChart from "./components/WheelSpeedDiffChart";
import GforceChart from "./components/GforceChart";
import Suzuka from "./components/tracks/Suzuka";
import SuspensionIcon from "./assets/icons/suspension";
import WheelIcon from "./assets/icons/wheel";
import TurboIcon from "./assets/icons/turbo";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./App.css";
import {
  LineChartOutlined,
  BarChartOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  GithubOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

let ipcRenderer;
if ("require" in window) {
  const electron = window.require("electron");
  ipcRenderer = electron.ipcRenderer;
} else {
  ipcRenderer = null;
}

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const MenuItemGroup = Menu.ItemGroup;

const maxItems = 300;

const loadDefaultValues = () => {
  const defaultArray = [...new Array(maxItems)].map((element, index) => {
    return {
      gas: 0,
      brake: 0,
      speed: 0,
      time: index,
      tc: 0,
      abs: 0,
      gear: 0,
      rpm: 0,
      turboBoost: 0,
      steerAngle: 0,
      ffb: 0,
      airTemp: 0,
      roadTemp: 0,
      accG: [0, 0, 0],
      tyreCoreTemp: [0, 0, 0, 0],
      carDamage: [0, 0, 0, 0, 0],
      suspensionDamage: [0, 0, 0, 0],
      suspensionTravel: [0, 0, 0, 0],
      wheelAngularSpeed: [0, 0],
      wheelAngularSpeedDiff: 0,
      trackGripStatus: "-",
      rainIntensity: "-",
      rainIntensityIn10min: "-",
      rainIntensityIn30min: "-",
      normalizedCarPosition: 0,
      playerNick: "-",
      track: "-",
      carModel: "-",
      smVersion: "-",
      acVersion: "-",
    };
  });
  return defaultArray;
};

function App() {
  const [data, setData] = useState(false);
  const [recentData, setRecentData] = useState(false);
  const [connStatus, setConnStatus] = useState("offline");
  const [accStatus, setAccStatus] = useState("offline");
  const [currView, setCurrView] = useState("basic");

  const webSocket = useRef(null);

  useEffect(() => {
    setData(loadDefaultValues());

    webSocket.current = new WebSocket("ws://127.0.0.1:8080");

    webSocket.current.onopen = () => {
      setConnStatus("online");
      webSocket.current.send(JSON.stringify({ msg: "ready_to_receive" }));
    };

    webSocket.current.onclose = () => {
      setData(loadDefaultValues());
      setConnStatus("offline");
    };

    webSocket.current.onmessage = (message) => {
      const telemetryData = JSON.parse(message.data);
      if (telemetryData.isEngineRunning) {
        setAccStatus("online");
        setRecentData(telemetryData);
        setData((oldArray) => {
          let clonedArr = [...oldArray];
          if (clonedArr.length > maxItems) {
            clonedArr.shift();
          } else {
            clonedArr = clonedArr;
          }
          return [...clonedArr, telemetryData];
        });
      } else {
        setAccStatus("offline");
        setData(loadDefaultValues());
      }
    };

    return () => webSocket.current.close();
  }, []);

  const getRecentData = (data, key, defaultVal = 0) => {
    let output;
    if (data && data.length > 0) {
      output = data[data.length - 1][key];
    } else {
      output = defaultVal;
    }
    return output;
  };

  const handleViewChange = (key) => {
    setCurrView(key);
  };

  const handleRefreshPage = (key) => {
    if (ipcRenderer) {
      ipcRenderer.send("window-force-reload");
    } else {
      window.location.reload();
    }
  };

  const renderCharts = () => {
    let element;
    if (currView === "basic") {
      element = (
        <>
          <FFBChart data={data} />
          <GasBrakeChart data={data} />
          <ABSTCChart data={data} />
          <SteerAngleChart data={data} />
          <SpeedChart data={data} />
          <RPMChart data={data} />
          <GEARChart data={data} />
        </>
      );
    } else if (currView === "suspension") {
      element = (
        <>
          <GasBrakeChart data={data} />
          <SteerAngleChart data={data} />
          <SuspensionTravelChart data={data} height={600} />
        </>
      );
    } else if (currView === "wheel") {
      element = (
        <>
          <GasBrakeChart data={data} />
          <SteerAngleChart data={data} />
          <WheelSpeedChart data={data} height={450} />
          <WheelSpeedDiffChart data={data} height={300} />
        </>
      );
    } else if (currView === "turbo") {
      element = (
        <>
          <GasBrakeChart data={data} />
          <RPMChart data={data} height={300} />
          <TurboBoostChart data={data} height={500} />
          <GEARChart data={data} />
        </>
      );
    } else {
      element = null;
    }
    return element;
  };

  const carDamage = recentData.carDamage || [0, 0, 0, 0, 0];
  const suspensionDamage = recentData.suspensionDamage || [0, 0, 0, 0];
  const tyreCoreTemp = recentData.tyreCoreTemp || [0, 0, 0, 0];

  return (
    <>
      <Layout hasSider>
        <Sider
          width="299"
          theme="light"
          style={{
            overflow: "auto",
            marginRight: "1px solid white",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="logo-container">
            <span className="logo">ACCTelemetry</span>
            <span className="sub">v2.0.0</span>
          </div>
          <Divider style={{ margin: "24px 0" }}>Connection</Divider>
          <div className="connection-info">
            <div>
              <span style={{ marginRight: 4 }}>Server:</span>
              {connStatus === "online" ? (
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              ) : (
                <CloseCircleTwoTone twoToneColor="red" />
              )}
            </div>
            <div>
              <span style={{ marginRight: 4 }}>Engine:</span>
              {accStatus === "online" ? (
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              ) : (
                <CloseCircleTwoTone twoToneColor="red" />
              )}
            </div>
            <div>
              <span style={{ marginRight: 4 }}>Telemetry:</span>
              {accStatus === "online" ? (
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              ) : (
                <CloseCircleTwoTone twoToneColor="red" />
              )}
            </div>
            <div style={{ marginTop: 8 }}>
              <Button
                id="refresh-app"
                type="dashed"
                size="small"
                onClick={handleRefreshPage}
              >
                Refresh
              </Button>
            </div>
          </div>
          <Divider style={{ margin: "24px 0" }}>Info</Divider>
          <div className="user-info">
            <div>User: {getRecentData(data, "playerNick")}</div>
            <div>Track: {getRecentData(data, "track")}</div>
            <div>Grip: {getRecentData(data, "trackGripStatus")}</div>
          </div>
          <Divider style={{ margin: "24px 0" }}>Car Details</Divider>
          <div className="damage-indicator">
            <div>Car: {getRecentData(data, "carModel")}</div>
            <CarChasis
              carDamage={carDamage}
              suspensionDamage={suspensionDamage}
              tyreCoreTemp={tyreCoreTemp}
            />
            <div>Total damage: {carDamage[4]}</div>
          </div>
          <Divider style={{ margin: "24px 0" }}>GForce meter</Divider>
          <GforceChart accG={getRecentData(data, "accG")} />
          <Divider style={{ margin: "24px 0" }}>Contact</Divider>
          <div style={{ padding: "0px 32px" }}>
            <p>Thanks for using this tool. Send your suggestions/feedbacks to rajavn6789@gmail.com</p>
          </div>
          {/* <Divider style={{margin: "32px 0"}}>Track</Divider>
          <Suzuka
            normalizedCarPosition={getRecentData(data, "normalizedCarPosition")}
          /> */}
        </Sider>
        <Layout style={{ marginLeft: 300 }}>
          <Header
            style={{
              position: "fixed",
              background: "#292c30",
              zIndex: 1,
              width: "100%",
              padding: 0,
            }}
          >
            <Menu
              theme="dark"
              style={{ background: "#292c30",
              width: 'calc(100% - 300px)'
            }}
              mode="horizontal"
              defaultSelectedKeys={[currView]}
            >
              <Menu.Item
                key="basic"
                onClick={({ key }) => handleViewChange(key)}
                icon={<LineChartOutlined />}
              >
                Basic
              </Menu.Item>
              <Menu.Item
                key="suspension"
                onClick={({ key }) => handleViewChange(key)}
                icon={<SuspensionIcon />}
              >
                Suspension
              </Menu.Item>
              <Menu.Item
                key="wheel"
                onClick={({ key }) => handleViewChange(key)}
                icon={<WheelIcon />}
              >
                Wheel
              </Menu.Item>
              <Menu.Item
                key="turbo"
                onClick={({ key }) => handleViewChange(key)}
                icon={<TurboIcon />}
              >
                Turbo
              </Menu.Item>
              <Menu.Item
                key="github"
                icon={<GithubOutlined />}
                style={{ marginLeft: "auto" }}
              >
                <a
                  href="https://github.com/Rajavn6789/acc_telemetry"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </Menu.Item>
            </Menu>
          </Header>
          <Content
            style={{
              marginTop: 50,
              minHeight: "calc(100vh)",
              background: "black",
            }}
          >
            <div>{renderCharts()}</div>
          </Content>
          <Footer
            style={{
              justifyContent: "center",
              padding: "12px 25px",
              display: "flex",
            }}
          >
            <div>©2022 | Developed by Raja S</div>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
